import { Crown, Medal, Trophy } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import leaderboardUsers from "@/data/leaderboardUsers"

const rankIcons = {
  1: Crown,
  2: Trophy,
  3: Medal,
}

const sortedUsers = [...leaderboardUsers].sort(
  (firstUser, secondUser) =>
    secondUser.ecoPoints - firstUser.ecoPoints
)

const topUsers = sortedUsers.slice(0, 3).map((user, index) => ({
  ...user,
  rank: index + 1,
  icon: rankIcons[index + 1],
}))

const otherUsers = sortedUsers.slice(3, 10).map((user, index) => ({
  ...user,
  rank: index + 4,
}))

function UserAvatar({ name }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)

  return <span className="leaderboard-avatar">{initials}</span>
}

function Leaderboard() {
  return (
    <section className="leaderboard-page">
      <div className="top-three-grid">
        {topUsers.map(({ rank, name, status, ecoPoints, icon: Icon }) => (
        <Card
            className={`top-user-card top-user-card-${rank}`}
            key={name}
        >
            <CardHeader className="top-user-header">
                <div className="top-user-rank">
                    {Icon && <Icon />}
                    <span>#{rank}</span>
                </div>

                <UserAvatar name={name} />
            </CardHeader>

            <CardContent className="top-user-content">
                <strong>{name}</strong>

                <span
                    className={`leaderboard-status ${
                    status === "Veteran" ? "veteran" : ""
                    }`}
                >
                    {status}
                </span>

                <div className="top-user-points">
                    <span>Eco Points</span>
                    <strong>{ecoPoints.toLocaleString("id-ID")}</strong>
                </div>
            </CardContent>
        </Card>
        ))}
      </div>

      <Card className="leaderboard-table-card">
        <CardHeader>
          <CardTitle>Peringkat Pengguna</CardTitle>
        </CardHeader>

        <CardContent className="leaderboard-table-content">
          <div className="leaderboard-table-head">
            <span>Peringkat</span>
            <span>Nama Pengguna</span>
            <span>Status</span>
            <span>Eco Points</span>
          </div>

          {otherUsers.map(({ rank, name, status, ecoPoints }) => (
            <div className="leaderboard-table-row" key={name}>
                <strong>#{rank}</strong>

                <div className="leaderboard-user-cell">
                <UserAvatar name={name} />
                <span>{name}</span>
                </div>

                <span
                className={`leaderboard-status ${
                    status === "Veteran" ? "veteran" : ""
                }`}
                >
                {status}
                </span>

                <strong className="leaderboard-points">
                {ecoPoints.toLocaleString("id-ID")}
                </strong>
            </div>
            ))}
        </CardContent>
      </Card>
    </section>
  )
}

export default Leaderboard