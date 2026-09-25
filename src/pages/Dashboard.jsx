import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import {
  Camera,
  Leaf,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts"

const stats = [
  {
    label: "Total Sampah",
    value: "2,4 kg",
    iconClass: "fa-solid fa-recycle",
    theme: "emerald",
  },
  {
    label: "ECO Points",
    value: "120",
    iconClass: "fa-solid fa-box",
    theme: "amber",
  },
  {
    label: "Item Dikelola",
    value: "42",
    iconClass: "fa-solid fa-file-circle-check",
    theme: "teal",
  },
  {
    label: "Green Streak",
    value: "7 hari",
    iconClass: "fa-solid fa-fire",
    theme: "rose",
  },
]

const activities = [
  {
    name: "Gelas Plastik",
    time: "2 mnt terakhir",
    points: "+15",
    status: "SELESAI",
    completed: true,
  },
  {
    name: "Kertas Karton",
    time: "3 jam terakhir",
    points: "+10",
    status: "DIPROSES",
    completed: false,
  },
  {
    name: "Kaleng Besi",
    time: "9 jam terakhir",
    points: "+20",
    status: "SELESAI",
    completed: true,
  },
  {
    name: "Botol Kaca",
    time: "1 hari terakhir",
    points: "+25",
    status: "SELESAI",
    completed: true,
  },
]

const chartData = [
  { day: "SEN", amount: 4, points: 15 },
  { day: "SEL", amount: 34, points: 85 },
  { day: "RAB", amount: 20, points: 60 },
  { day: "KAM", amount: 62, points: 145 },
  { day: "JUM", amount: 4, points: 25 },
  { day: "SAB", amount: 4, points: 20 },
  { day: "MIN", amount: 4, points: 15 },
]

const chartConfig = {
  amount: {
    label: "Sampah",
    color: "var(--eco-green)",
  },
  points: {
    label: "Points",
    color: "#d97706",
  },
}

function Dashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("Sampah")
  const isPoints = activeTab === "Points"

  return (
    <div className="dashboard-grid">
      {/* ROW 1: Weekly Progress Chart */}
      <Card className="weekly-card">
        <CardHeader className="weekly-header">
          <CardTitle className="text-eco-text">Progress Mingguan</CardTitle>

          <div className="progress-tabs gap-1" data-active={activeTab}>
            <div className="progress-tabs-slider" aria-hidden="true" />
            {["Sampah", "Points"].map((tab) => (
              <Button
                key={tab}
                size="sm"
                variant="ghost"
                className={activeTab === tab ? "active-tab" : "inactive-tab"}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="weekly-chart h-[257px] w-full"
          >
            <ComposedChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 14,
                right: 8,
                left: 8,
                bottom: 20,
              }}
            >
              <CartesianGrid
                vertical={false}
                stroke="var(--eco-border)"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tick={{
                  fill: "var(--eco-text)",
                  fontSize: 10,
                  fontWeight: 700,
                }}
              />

              <YAxis
                yAxisId="amount"
                hide
                domain={[0, (dataMax) => Math.max(dataMax * 1.15, 70)]}
              />
              <YAxis
                yAxisId="points"
                orientation="right"
                hide
                domain={[0, (dataMax) => Math.max(dataMax * 1.15, 160)]}
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    className="bg-white border-gray-200 shadow-md"
                    formatter={(value, name, item) => {
                      const metricKey = name || item?.dataKey
                      const isAmountMetric = metricKey === "amount"
                      const label = isAmountMetric ? "Sampah" : "Points"
                      const color = isAmountMetric ? "var(--eco-green)" : "#d97706"
                      const unit = isAmountMetric ? "kg" : "pts"

                      return (
                        <div className="flex w-full items-center justify-between gap-4 py-0.5">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="inline-block h-2 w-2 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-muted-foreground font-medium">
                              {label}
                            </span>
                          </div>
                          <span className="font-mono font-bold text-foreground tabular-nums">
                            {value} {unit}
                          </span>
                        </div>
                      )
                    }}
                  />
                }
              />

              <Bar
                yAxisId="amount"
                name="amount"
                dataKey="amount"
                fill="var(--color-amount)"
                radius={[8, 8, 0, 0]}
                maxBarSize={56}
                cursor="pointer"
                opacity={isPoints ? 0.22 : 1}
                style={{
                  transition: "opacity 0.3s ease",
                }}
              />

              <Line
                yAxisId="points"
                name="points"
                type="monotone"
                dataKey="points"
                stroke="var(--color-points)"
                strokeWidth={isPoints ? 3.5 : 2}
                strokeOpacity={isPoints ? 1 : 0.35}
                dot={{
                  r: isPoints ? 4.5 : 2.5,
                  fill: isPoints ? "#ffffff" : "var(--color-points)",
                  stroke: "var(--color-points)",
                  strokeWidth: isPoints ? 2.5 : 1.5,
                  strokeOpacity: isPoints ? 1 : 0.4,
                  fillOpacity: isPoints ? 1 : 0.4,
                }}
                activeDot={{
                  r: 6,
                  fill: "var(--color-points)",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
                style={{
                  transition: "all 0.3s ease",
                }}
              />
            </ComposedChart>
          </ChartContainer>

          <div className="target-row">
            <strong className="text-eco-text">Target Bulan Ini</strong>
            <span className={isPoints ? "points-active" : ""}>
              {isPoints ? "120 pts / 150 pts" : "2,4 kg / 3 kg"}
            </span>
          </div>

          <div className="progress-track">
            <div
              className={`progress-value ${isPoints ? "points-active" : ""}`}
            />
          </div>
        </CardContent>
      </Card>

      {/* ROW 1: Scan CTA Card */}
      <Card className="scanner-card">
        <CardContent>
          <Leaf className="scanner-icon" />

          <h2 className="text-center font-display">Ada sampah tapi tak tahu jenisnya?</h2>

          <p className="text-center">
            Foto sampahnya dan EcoCycle AI akan mendeteksinya dan memberikan
            cara mengelolanya secara instan.
          </p>

          <Button className="scanner-action-button" onClick={() => navigate("/scanner")}>
            <Camera />
            Ayo Scan Sampahmu
          </Button>
        </CardContent>
      </Card>

      {/* ROW 2: Summary Metric Cards (2x2 Grid) */}
      <div className="stats-grid">
        {stats.map(({ label, value, iconClass, theme }) => (
          <Card className={`stat-card stat-card-${theme}`} key={label}>
            <CardContent className="stat-card-content">
              <div className="stat-icon-wrapper">
                <i className={`${iconClass} stat-icon-svg`} />
              </div>
              <div className="stat-info">
                <span className="stat-label">{label}</span>
                <strong className="stat-value">{value}</strong>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ROW 2: Recent Activities */}
      <Card className="activity-card py-2 gap-0">
        <CardHeader className="activity-header">
          <CardTitle className="text-md font-bold">Aktivitas Terakhir</CardTitle>
          <Link to="/notifications" className="text-xs font-light text-muted">Semua aktivitas</Link>
        </CardHeader>

        <CardContent className="activity-list gap-0">
          {activities.map((activity) => (
            <div className="activity-item" key={activity.name}>
              <div>
                <strong>{activity.name}</strong>
                <span>{activity.time}</span>
              </div>

              <div className="activity-result">
                <small className={activity.completed ? "done" : ""}>
                  {activity.status}
                </small>

                <span>{activity.points}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard