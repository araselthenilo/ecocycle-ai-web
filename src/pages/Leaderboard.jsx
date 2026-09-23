import { Crown, Medal, Trophy } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import leaderboardUsers from "@/data/leaderboardUsers"

function formatPoints(points) {
  return new Intl.NumberFormat("id-ID").format(points)
}

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
      {/* Podium top-3 — Kahoot style */}
      <div className="podium-wrapper">
        <div className="podium-stage">
          {/* Display order: 2nd | 1st | 3rd */}
          {[topUsers[1], topUsers[0], topUsers[2]].map(({ id, rank, name, status, ecoPoints, icon: Icon }) => (
            <div key={id} className={`podium-slot podium-slot-${rank}`}>
              {/* Player card above the block */}
              <div className="podium-player">
                {rank === 1 && <div className="podium-crown-glow" />}
                <div className={`podium-icon-badge podium-icon-badge-${rank}`}>
                  <Icon />
                </div>
                <div className={`podium-avatar podium-avatar-${rank}`}>
                  {name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <strong className="podium-name">{name}</strong>
                <span className={`leaderboard-status ${status === "Veteran" ? "veteran" : ""}`}>
                  {status}
                </span>
                <div className="podium-points">
                  <span className="podium-points-label">Eco Points</span>
                  <strong className={`podium-points-value podium-points-value-${rank}`}>
                    {formatPoints(ecoPoints)}
                  </strong>
                </div>
              </div>

              {/* The stepped podium block */}
              <div className={`podium-block podium-block-${rank}`}>
                <span className="podium-rank-label">#{rank}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card className="leaderboard-table-card">
        <CardHeader>
          <CardTitle>Peringkat Pengguna</CardTitle>
        </CardHeader>

        <CardContent className="leaderboard-table-content py-0">
          <div className="leaderboard-table-head">
            <span>Peringkat</span>
            <span>Nama Pengguna</span>
            <span>Status</span>
            <span>Eco Points</span>
          </div>

          {otherUsers.map(({ id, rank, name, status, ecoPoints }) => (
            <div className="leaderboard-table-row" key={id}>
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
                {formatPoints(ecoPoints)}
              </strong>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}

export default Leaderboard