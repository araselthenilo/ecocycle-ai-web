import { useState, useRef, useEffect, useCallback } from "react"
import {
  Camera,
  FileUp,
  Info,
  ListChecks,
  X,
  ScanLine,
  UploadCloud,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const initialHandlingSteps = [
  "Arahkan kamera atau unggah foto sampah yang ingin dipindai.",
  "Pastikan objek sampah terlihat jelas dan berpusat di layar.",
  "AI EcoCycle akan mendeteksi jenis polimer dan material sampah.",
  "Hasil pemilahan dan rekomendasi daur ulang akan muncul di sini.",
]

const bottleHandlingSteps = [
  "Kosongkan isi botol dari sisa cairan.",
  "Bersihkan botol dengan sedikit air mengalir.",
  "Pisahkan tutup botol jika diperlukan oleh pengepul.",
  "Setorkan ke recycling point atau bank sampah terdekat.",
]

const canHandlingSteps = [
  "Pastikan kaleng sudah kosong dari sisa cairan.",
  "Bilas dengan sedikit air mengalir agar tidak berbau.",
  "Pipihkan kaleng jika memungkinkan untuk menghemat ruang.",
  "Setorkan ke recycling point atau bank sampah terdekat.",
]

const cardboardHandlingSteps = [
  "Lepaskan sisa selotip plastik atau perekat pada kardus.",
  "Lipat dan ratakan kardus agar rapi dan hemat tempat.",
  "Pastikan kardus dalam keadaan kering dan bebas noda minyak.",
  "Setorkan ke recycling point atau bank sampah terdekat.",
]

function AIScanner() {
  const [previewImage, setPreviewImage] = useState(null)
  const [hasScanned, setHasScanned] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [cameraError, setCameraError] = useState(null)

  // Scan result state
  const [scanResult, setScanResult] = useState({
    name: "Botol Plastik",
    material: "PET Plastic (Polyethylene Terephthalate)",
    weight: "20g",
    recyclable: "YA",
    steps: initialHandlingSteps,
  })

  const videoRef = useRef(null)
  const fileInputRef = useRef(null)
  const streamRef = useRef(null)
  const timerRef = useRef(null)

  // Cleanly stop any active camera stream
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsCameraActive(false)
    setCameraError(null)
  }, [])

  // Cleanup camera and timers on unmount
  useEffect(() => {
    return () => {
      stopCamera()
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [stopCamera])

  // Attach camera stream to video tag whenever camera is activated
  useEffect(() => {
    if (isCameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current
    }
  }, [isCameraActive])

  // Trigger simulated AI scanning process
  const triggerScanSimulation = (matchedData) => {
    setIsScanning(true)
    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      if (matchedData) {
        setScanResult(matchedData)
        setHasScanned(true)
      }
      setIsScanning(false)
    }, 1500)
  }

  // Start real device camera using MediaDevices API
  const startCamera = async () => {
    setCameraError(null)
    try {
      if (!navigator?.mediaDevices?.getUserMedia) {
        throw new Error("Perangkat atau peramban tidak mendukung akses kamera.")
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })

      streamRef.current = stream
      setIsCameraActive(true)
    } catch (err) {
      console.error("Camera access failed:", err)
      setCameraError(
        err.name === "NotAllowedError" || err.name === "PermissionDeniedError"
          ? "Izin akses kamera ditolak. Silakan izinkan kamera di peramban Anda."
          : "Kamera tidak ditemukan atau sedang digunakan oleh aplikasi lain."
      )
      alert("Akses kamera: " + (err.message || "Tidak dapat membuka kamera perangkat."))
    }
  }

  // Capture frame from the active camera stream into an image
  const capturePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current
      const width = video.videoWidth || 640
      const height = video.videoHeight || 480

      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext("2d")
      ctx.drawImage(video, 0, 0, width, height)
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9)

      stopCamera()
      setPreviewImage(dataUrl)

      // Run scan simulation on the captured image
      triggerScanSimulation({
        name: "Botol Plastik",
        material: "PET Plastic (Polyethylene Terephthalate)",
        weight: "20g",
        recyclable: "YA",
        steps: bottleHandlingSteps,
      })
    }
  }

  // Handle click on "Ambil Foto" button
  const handleCameraToggle = () => {
    if (isCameraActive) {
      capturePhoto()
    } else {
      startCamera()
    }
  }

  // Process selected or dropped image file
  const processImageFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return

    stopCamera()
    const objectUrl = URL.createObjectURL(file)
    setPreviewImage(objectUrl)

    // Intelligently map waste classification if filename indicates type
    const lowerName = file.name.toLowerCase()
    let detectedWaste = {
      name: "Botol Plastik",
      material: "PET Plastic (Polyethylene Terephthalate)",
      weight: "20g",
      recyclable: "YA",
      steps: bottleHandlingSteps,
    }

    if (lowerName.includes("kaleng") || lowerName.includes("can") || lowerName.includes("soda")) {
      detectedWaste = {
        name: "Kaleng Minuman",
        material: "Aluminium (100% Recyclable)",
        weight: "15g",
        recyclable: "YA",
        steps: canHandlingSteps,
      }
    } else if (lowerName.includes("kardus") || lowerName.includes("box") || lowerName.includes("karton") || lowerName.includes("cardboard")) {
      detectedWaste = {
        name: "Kardus Karton",
        material: "Corrugated Cardboard (Kertas)",
        weight: "85g",
        recyclable: "YA",
        steps: cardboardHandlingSteps,
      }
    }

    triggerScanSimulation(detectedWaste)
  }

  // Handle uploading picture from user's device
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      processImageFile(file)
      e.target.value = ""
    }
  }

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      processImageFile(file)
    }
  }

  // Reset to default empty dropzone
  const handleResetPreview = (e) => {
    e.stopPropagation()
    stopCamera()
    setPreviewImage(null)
    setHasScanned(false)
    setScanResult({
      name: "Botol Plastik",
      material: "PET Plastic (Polyethylene Terephthalate)",
      weight: "20g",
      recyclable: "YA",
      steps: initialHandlingSteps,
    })
  }

  return (
    <div className="scanner-page">
      {/* Hidden file input for native picture upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        style={{ display: "none" }}
      />

      <section className="scanner-upload-column">
        <Card className="scanner-upload-card">
          <CardHeader className="scanner-upload-header">
            <CardTitle>Ambil Foto atau Unggah Gambar Sampahnya</CardTitle>

            <p>
              Gunakan kamera Anda untuk memindai objek secara real-time atau
              unggah dari galeri perangkat Anda.
            </p>
          </CardHeader>

          <CardContent className="scanner-upload-actions">
            <Button
              className={`scanner-action-button ${isCameraActive ? "scanner-action-camera-active" : ""}`}
              onClick={handleCameraToggle}
            >
              <Camera />
              {isCameraActive ? "Jepret Foto" : "Ambil Foto"}
            </Button>

            <Button
              className="scanner-action-button"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileUp />
              Unggah Gambar
            </Button>
          </CardContent>
        </Card>

        {/* Enhanced Scanner Preview Area */}
        <div className="scanner-preview">
          {isCameraActive ? (
            /* ACTIVE CAMERA MODE */
            <div className="scanner-viewport-wrapper">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="scanner-live-video"
              />

              {/* Viewfinder HUD reticle */}
              <div className="scanner-viewfinder-hud">
                <div className="scanner-corner corner-top-left" />
                <div className="scanner-corner corner-top-right" />
                <div className="scanner-corner corner-bottom-left" />
                <div className="scanner-corner corner-bottom-right" />
                <div className="scanner-viewfinder-crosshair" />

                <div className="scanner-live-badge">
                  <span className="scanner-live-indicator" />
                  <span>LIVE KAMERA</span>
                </div>

                <button
                  type="button"
                  className="scanner-close-camera-btn"
                  onClick={stopCamera}
                  title="Tutup Kamera"
                >
                  <X size={16} />
                </button>

                <div className="scanner-camera-tip">
                  Klik <strong>"Jepret Foto"</strong> untuk memotret objek
                </div>
              </div>
            </div>
          ) : previewImage ? (
            /* IMAGE PREVIEW WITH SCANNING OVERLAY */
            <div className="scanner-viewport-wrapper">
              <img
                src={previewImage}
                alt="Pratinjau Sampah"
                className={`scanner-preview-image ${isScanning ? "scanner-image-analyzing" : ""}`}
              />

              {/* High-tech scanning laser overlay */}
              {isScanning ? (
                <div className="scanner-laser-overlay">
                  <div className="scanner-laser-bar" />
                  <div className="scanner-corner corner-top-left" />
                  <div className="scanner-corner corner-top-right" />
                  <div className="scanner-corner corner-bottom-left" />
                  <div className="scanner-corner corner-bottom-right" />

                  <div className="scanner-scanning-pill">
                    <ScanLine className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                    <span>Memindai AI...</span>
                  </div>
                </div>
              ) : (
                /* Framing corners and reset button on loaded image */
                <div className="scanner-frame-overlay">
                  <div className="scanner-corner corner-top-left" />
                  <div className="scanner-corner corner-top-right" />
                  <div className="scanner-corner corner-bottom-left" />
                  <div className="scanner-corner corner-bottom-right" />

                  <button
                    type="button"
                    className="scanner-clear-image-btn"
                    onClick={handleResetPreview}
                    title="Ganti atau hapus foto"
                  >
                    <X size={15} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* DEFAULT PREVIEW: INTERACTIVE DROPZONE / CAMERA ICON */
            <div
              className={`scanner-viewport-wrapper scanner-dropzone-wrapper ${isDragging ? "scanner-dropzone-active" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              role="button"
              tabIndex={0}
              title="Klik untuk unggah atau seret file ke sini"
            >
              <div className="scanner-frame-overlay">
                <div className="scanner-corner corner-top-left" />
                <div className="scanner-corner corner-top-right" />
                <div className="scanner-corner corner-bottom-left" />
                <div className="scanner-corner corner-bottom-right" />
                <div className="scanner-viewfinder-crosshair" />
              </div>

              <div className="scanner-dropzone-content">
                <div className="scanner-dropzone-icon-box">
                  <UploadCloud className="w-8 h-8 text-emerald-700" />
                </div>

                <h3 className="scanner-dropzone-title">Siap Memindai Sampah</h3>
                <p className="scanner-dropzone-subtitle">
                  Klik untuk unggah gambar atau seret file sampah ke sini
                </p>

                <div className="scanner-dropzone-action-hint">
                  <Camera className="w-3.5 h-3.5 text-emerald-700" />
                  <span>atau gunakan tombol <strong>"Ambil Foto"</strong> di atas</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="scanner-result-column">
        <Card className="scanner-result-card">
          <CardHeader>
            <CardTitle className="scanner-card-title">
              <Info />
              <span>Hasil Scanning</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="scanner-result-content">
            <div className="scanner-result-item">
              <strong>NAMA SAMPAH</strong>
              <span>
                {isScanning
                  ? "Memindai..."
                  : hasScanned
                    ? scanResult.name
                    : "Belum ada objek"}
              </span>
            </div>

            <div className="scanner-result-item">
              <strong>MATERIAL</strong>
              <span>
                {isScanning
                  ? "Menganalisis..."
                  : hasScanned
                    ? scanResult.material
                    : "—"}
              </span>
            </div>

            <div className="scanner-result-item">
              <strong>ESTIMASI BERAT</strong>
              <span>
                {isScanning
                  ? "Mengukur..."
                  : hasScanned
                    ? scanResult.weight
                    : "—"}
              </span>
            </div>

            <div className="scanner-result-item">
              <strong>DAPAT DIDAUR ULANG</strong>
              <span className={hasScanned ? "scanner-recyclable" : "scanner-placeholder-value"}>
                {isScanning
                  ? "..."
                  : hasScanned
                    ? scanResult.recyclable
                    : "—"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="scanner-handling-card">
          <CardHeader>
            <CardTitle className="scanner-card-title">
              <ListChecks />
              <span>Cara Mengelola</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="scanner-steps">
            {scanResult.steps.map((step, index) => (
              <div className="scanner-step" key={step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default AIScanner