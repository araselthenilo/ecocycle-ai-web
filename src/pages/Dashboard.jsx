import { useState } from "react"
import {
  Camera,
  Download,
  FileCheck2,
  Flame,
  Leaf,
  Package,
  Recycle,
  SlidersHorizontal,
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
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts"

const stats = [
  {
    label: "Total Sampah",
    value: "2,4 kg",
    icon: Recycle,
  },
  {
    label: "ECO Points",
    value: "120",
    icon: Package,
  },
  {
    label: "Item Dikelola",
    value: "42",
    icon: FileCheck2,
  },
  {
    label: "Green Streak",
    value: "7 hari",
    icon: Flame,
    danger: true,
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
  { day: "SEN", amount: 4 },
  { day: "SEL", amount: 34 },
  { day: "RAB", amount: 20 },
  { day: "KAM", amount: 62 },
  { day: "JUM", amount: 4 },
  { day: "SAB", amount: 4 },
  { day: "MIN", amount: 4 },
]

const chartConfig = {
  amount: {
    label: "Sampah",
    color: "#007a63",
  },
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Sampah")

  return (
    <div className="dashboard-grid">
      <section className="dashboard-main">
        <div className="stats-grid">
          {stats.map(({ label, value, icon: Icon, danger }) => (
            <Card className="stat-card py-0" key={label}>
              <CardContent className="gap-1 p-2">
                <span className={`stat-icon ${danger ? "danger" : ""}`}>
                  <Icon />
                </span>

                <span className="stat-label">{label}</span>
                <strong className="text-[#303634]">{value}</strong>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="weekly-card">
          <CardHeader className="weekly-header">
            <CardTitle className="text-[#303634]">Progress Mingguan</CardTitle>

            <div className="progress-tabs">
              {["Sampah", "Points"].map((tab) => (
                <Button
                  key={tab}
                  size="sm"
                  variant={activeTab === tab ? "secondary" : "ghost"}
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
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 12,
                  right: 4,
                  left: 4,
                  bottom: 20,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#dce3df"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tick={{
                    fill: "#303634",
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />

                <Bar
                  dataKey="amount"
                  fill="var(--color-amount)"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={24}
                />
              </BarChart>
            </ChartContainer>

            <div className="target-row">
              <strong className="text-[#303634]">Target Bulan Ini</strong>
              <span>2,4 kg / 3 kg</span>
            </div>

            <div className="progress-track">
              <div className="progress-value" />
            </div>
          </CardContent>
        </Card>
      </section>

      <aside className="dashboard-side">
        <Card className="scanner-card">
          <CardContent>
            <Leaf className="scanner-icon" />

            <h2>Ada sampah tapi tak tahu jenisnya?</h2>

            <p>
              Foto sampahnya dan EcoCycle AI akan mendeteksinya dan memberikan
              cara mengelolanya secara instan.
            </p>

            <Button className="scanner-action-button">
              <Camera />
              Ayo Scan Sampahmu
            </Button>
          </CardContent>
        </Card>

        <Card className="activity-card py-2 gap-1">
          <CardHeader className="activity-header">
            <CardTitle className="text-xs">Aktivitas Terakhir</CardTitle>

            <div className="activity-actions">
              <Button variant="outline" size="icon-xs">
                <SlidersHorizontal />
              </Button>

              <Button variant="outline" size="icon-xs">
                <Download />
              </Button>
            </div>
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
      </aside>
    </div>
  )
}

export default Dashboard