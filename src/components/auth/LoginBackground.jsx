import { useEffect, useRef } from 'react';

// Exact reconstructed geometric circle definitions from Figma Node 4:459
const BASE_CIRCLES = [
  { cx: 332, cy: 529, r: 253, sign: 1,  speedX: 0.38, speedY: 0.28, ampX: 28, ampY: 42, phase: 0.0 },
  { cx: 629, cy: 332, r: 420, sign: -1, speedX: 0.25, speedY: 0.32, ampX: 35, ampY: 38, phase: 1.8 },
  { cx: 304, cy: 835, r: 421, sign: 1,  speedX: 0.30, speedY: 0.22, ampX: 32, ampY: 45, phase: 3.2 },
  { cx: 101, cy: 361, r: 253, sign: 1,  speedX: 0.42, speedY: 0.35, ampX: 30, ampY: 50, phase: 4.5 },
  { cx: 249, cy: 98,  r: 212, sign: 1,  speedX: 0.28, speedY: 0.30, ampX: 25, ampY: 30, phase: 2.1 },
  { cx: 658, cy: 55,  r: 255, sign: 1,  speedX: 0.32, speedY: 0.26, ampX: 28, ampY: 35, phase: 5.4 },
  { cx: 708, cy: 903, r: 283, sign: -1, speedX: 0.35, speedY: 0.40, ampX: 26, ampY: 44, phase: 0.9 },
  { cx: -2,  cy: 692, r: 206, sign: -1, speedX: 0.26, speedY: 0.34, ampX: 30, ampY: 40, phase: 3.8 },
];

const W = 860;
const H = 1024;

const VERTEX_SHADER_SRC = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = (position + 1.0) * 0.5;
  vUv.y = 1.0 - vUv.y;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `
precision highp float;
varying vec2 vUv;
uniform vec2 u_resolution;
uniform float u_time;

// Circle positions and radii passed from JS
uniform vec4 u_c0; // x, y, r, sign
uniform vec4 u_c1;
uniform vec4 u_c2;
uniform vec4 u_c3;
uniform vec4 u_c4;
uniform vec4 u_c5;
uniform vec4 u_c6;
uniform vec4 u_c7;

// Exact brand colors
const vec3 COLOR_M = vec3(53.0 / 255.0, 145.0 / 255.0, 129.0 / 255.0);  // #359181 Medium Teal
const vec3 COLOR_L = vec3(138.0 / 255.0, 208.0 / 255.0, 199.0 / 255.0); // #8AD0C7 Light Mint
const vec3 COLOR_D = vec3(35.0 / 255.0, 131.0 / 255.0, 114.0 / 255.0);  // #238372 Dark Teal

vec3 evalPoint(vec2 p) {
  int k = 0;
  float prod = 1.0;

  if (length(p - u_c0.xy) < u_c0.z) { k++; prod *= u_c0.w; }
  if (length(p - u_c1.xy) < u_c1.z) { k++; prod *= u_c1.w; }
  if (length(p - u_c2.xy) < u_c2.z) { k++; prod *= u_c2.w; }
  if (length(p - u_c3.xy) < u_c3.z) { k++; prod *= u_c3.w; }
  if (length(p - u_c4.xy) < u_c4.z) { k++; prod *= u_c4.w; }
  if (length(p - u_c5.xy) < u_c5.z) { k++; prod *= u_c5.w; }
  if (length(p - u_c6.xy) < u_c6.z) { k++; prod *= u_c6.w; }
  if (length(p - u_c7.xy) < u_c7.z) { k++; prod *= u_c7.w; }

  // Mathematical parity formula matching the exact original design
  if (mod(float(k), 2.0) == 1.0) {
    return COLOR_M;
  } else {
    return prod > 0.0 ? COLOR_L : COLOR_D;
  }
}

void main() {
  // Object-cover aspect mapping to 860x1024 virtual coordinate canvas
  float canvasAspect = 860.0 / 1024.0;
  float screenAspect = u_resolution.x / u_resolution.y;

  vec2 uv = vUv;
  if (screenAspect > canvasAspect) {
    float scale = screenAspect / canvasAspect;
    uv.y = (uv.y - 0.5) / scale + 0.5;
  } else {
    float scale = canvasAspect / screenAspect;
    uv.x = (uv.x - 0.5) / scale + 0.5;
  }

  vec2 p = uv * vec2(860.0, 1024.0);
  vec2 dPix = (vec2(1.0) / u_resolution) * vec2(860.0, 1024.0);

  // 4x Multisampling for ultra-crisp anti-aliased geometric circle edges
  vec3 col1 = evalPoint(p + vec2(-0.35, -0.35) * dPix);
  vec3 col2 = evalPoint(p + vec2( 0.35, -0.35) * dPix);
  vec3 col3 = evalPoint(p + vec2(-0.35,  0.35) * dPix);
  vec3 col4 = evalPoint(p + vec2( 0.35,  0.35) * dPix);

  vec3 finalColor = (col1 + col2 + col3 + col4) * 0.25;
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function LoginBackground({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: true, alpha: false }) ||
               canvas.getContext('experimental-webgl', { antialias: true, alpha: false });

    if (!gl) {
      console.warn('WebGL not supported, falling back');
      return;
    }

    const vertShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full screen quad buffer
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uCircles = [
      gl.getUniformLocation(program, 'u_c0'),
      gl.getUniformLocation(program, 'u_c1'),
      gl.getUniformLocation(program, 'u_c2'),
      gl.getUniformLocation(program, 'u_c3'),
      gl.getUniformLocation(program, 'u_c4'),
      gl.getUniformLocation(program, 'u_c5'),
      gl.getUniformLocation(program, 'u_c6'),
      gl.getUniformLocation(program, 'u_c7'),
    ];

    let animationId;
    const startTime = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.round(canvas.clientWidth * dpr);
      const displayHeight = Math.round(canvas.clientHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth || W;
        canvas.height = displayHeight || H;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const render = (now) => {
      resize();
      const t = (now - startTime) * 0.001;

      gl.useProgram(program);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);

      // Dynamically move each circle like smooth floating lava lamp bubbles
      BASE_CIRCLES.forEach((bc, idx) => {
        const cx = bc.cx + Math.sin(t * bc.speedX + bc.phase) * bc.ampX;
        const cy = bc.cy + Math.cos(t * bc.speedY + bc.phase) * bc.ampY;
        // Subtle breathing radius expansion & contraction
        const r = bc.r + Math.sin(t * (bc.speedX * 0.7) + bc.phase) * 12.0;

        gl.uniform4f(uCircles[idx], cx, cy, r, bc.sign);
      });

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(posBuffer);
    };
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#1F7A65] ${className}`}>
      {/* Exact geometric circles, moving smoothly like floating lava lamp bubbles */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover select-none pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
