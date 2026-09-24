import { useState, useMemo } from "react"
import {
  Crown,
  Medal,
  Trophy,
  Search,
  Sparkles,
  Users,
  Target,
  Leaf,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuth } from "@/context/AuthContext"
import leaderboardUsers from "@/data/leaderboardUsers"

function formatPoints(points) {
  return new Intl.NumberFormat("id-ID").format(points)
}

const rankIcons = {
  1: Crown,
  2: Trophy,
  3: Medal,
}

const rankThemeConfig = {
  1: {
    colorName: "gold",
    label: "Juara 1",
    podiumHeight: "podium-block-gold",
    badgeClass: "podium-badge-gold",
    avatarClass: "podium-avatar-gold",
  },
  2: {
    colorName: "silver",
    label: "Juara 2",
    podiumHeight: "podium-block-silver",
    badgeClass: "podium-badge-silver",
    avatarClass: "podium-avatar-silver",
  },
  3: {
    colorName: "bronze",
    label: "Juara 3",
    podiumHeight: "podium-block-bronze",
    badgeClass: "podium-badge-bronze",
    avatarClass: "podium-avatar-bronze",
  },
}

function UserAvatar({ name, rank = 0 }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <span className="leaderboard-avatar">
      {initials}
    </span>
  )
}

function Leaderboard() {
  const { user } = useAuth()
  const [timeframe, setTimeframe] = useState("all") // "all" | "month" | "week"
  const [searchQuery, setSearchQuery] = useState("")

  // Adjust mock points dynamically depending on timeframe
  const processedUsers = useMemo(() => {
    let multiplier = 1
    if (timeframe === "month") multiplier = 0.42
    if (timeframe === "week") multiplier = 0.15

    return [...leaderboardUsers]
      .map((u) => ({
        ...u,
        ecoPoints: Math.round(u.ecoPoints * multiplier),
      }))
      .sort((a, b) => b.ecoPoints - a.ecoPoints)
  }, [timeframe])

  const topUsers = useMemo(() => {
    return processedUsers.slice(0, 3).map((item, index) => ({
      ...item,
      rank: index + 1,
      icon: rankIcons[index + 1],
      config: rankThemeConfig[index + 1],
    }))
  }, [processedUsers])

  const otherUsers = useMemo(() => {
    const list = processedUsers.slice(3).map((item, index) => ({
      ...item,
      rank: index + 4,
    }))

    if (!searchQuery.trim()) return list
    return list.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    )
  }, [processedUsers, searchQuery])

  // Current user rank or stats helper
  const currentUserName = user?.name || "Siti Rahma"
  const currentUserEntry = processedUsers.find(
    (u) => u.name.toLowerCase() === currentUserName.toLowerCase()
  ) || {
    name: currentUserName,
    rank: 4,
    ecoPoints: topUsers[2] ? Math.round(topUsers[2].ecoPoints * 0.88) : 980,
    status: "Anggota",
  }

  const pointsToPodium = topUsers[2]
    ? Math.max(0, topUsers[2].ecoPoints - currentUserEntry.ecoPoints + 15)
    : 120

  return (
    <section className="leaderboard-page">
      {/* Kahoot-Style Vibrant Podium: Gold (#1), Silver (#2), Bronze (#3) */}
      <div className="podium-wrapper">
        <div className="podium-stage">
          {/* Display order Kahoot: 2nd (Silver, Left) | 1st (Gold, Center) | 3rd (Bronze, Right) */}
          {[topUsers[1], topUsers[0], topUsers[2]].map(
            ({ id, rank, name, status, ecoPoints, icon: Icon, config }) => {
              return (
                <div
                  key={id}
                  className={`podium-slot podium-slot-${config.colorName}`}
                >
                  {/* Player info above the stepped block */}
                  <div className="podium-player">
                    <div
                      className={`podium-icon-badge ${config.badgeClass}`}
                      title={config.label}
                    >
                      <Icon className="size-3.5" />
                    </div>

                    <div className={`podium-avatar ${config.avatarClass}`}>
                      {name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>

                    <strong className="podium-name" title={name}>
                      {name}
                    </strong>

                    {/* Leaf-shaped borderless status pill with soft shadow */}
                    <span
                      className={`leaderboard-status ${status === "Veteran" ? "veteran" : "anggota"
                        }`}
                    >
                      {status}
                    </span>

                    <div className="podium-points">
                      <span className="podium-points-label">Eco Points</span>
                      <strong
                        className={`podium-points-value podium-points-${config.colorName}`}
                      >
                        <Leaf className="size-3 inline mr-0.5 opacity-80" />
                        {formatPoints(ecoPoints)}
                      </strong>
                    </div>
                  </div>

                  {/* Kahoot Stepped Podium Block with solid colors */}
                  <div className={`podium-block ${config.podiumHeight}`}>
                    <div className="podium-rank-badge">
                      <span className="podium-rank-hash">#</span>
                      <span className="podium-rank-number">{rank}</span>
                    </div>
                  </div>
                </div>
              )
            }
          )}
        </div>
      </div>

      {/* Compact 4-Grid Colorful Summary Cards (Borderless & Leaf-Shaped) */}
      <div className="leaderboard-summary-strip">
        <div className="leaderboard-stat-card stat-gold">
          <div className="lead-stat-icon">
            <Crown className="size-3.5" />
          </div>
          <div className="lead-stat-info">
            <span className="lead-stat-label">Juara 1</span>
            <strong className="lead-stat-val">
              {topUsers[0]?.name?.split(" ")[0]}
            </strong>
            <span className="lead-stat-sub">
              {formatPoints(topUsers[0]?.ecoPoints || 0)} Pts
            </span>
          </div>
        </div>

        <div className="leaderboard-stat-card stat-emerald">
          <div className="lead-stat-icon">
            <Sparkles className="size-3.5" />
          </div>
          <div className="lead-stat-info">
            <span className="lead-stat-label">Peringkat Anda</span>
            <strong className="lead-stat-val">
              #{currentUserEntry.rank || 4}
            </strong>
            <span className="lead-stat-sub">
              {formatPoints(currentUserEntry.ecoPoints)} Pts
            </span>
          </div>
        </div>

        <div className="leaderboard-stat-card stat-teal">
          <div className="lead-stat-icon">
            <Users className="size-3.5" />
          </div>
          <div className="lead-stat-info">
            <span className="lead-stat-label">Komunitas</span>
            <strong className="lead-stat-val">156 Aktif</strong>
            <span className="lead-stat-sub">Eco Warriors</span>
          </div>
        </div>

        <div className="leaderboard-stat-card stat-amber">
          <div className="lead-stat-icon">
            <Target className="size-3.5" />
          </div>
          <div className="lead-stat-info">
            <span className="lead-stat-label">Jarak Top 3</span>
            <strong className="lead-stat-val">
              +{formatPoints(pointsToPodium)}
            </strong>
            <span className="lead-stat-sub">Target Podium</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Timeframe Filters (Leaf-Shaped) & Search */}
      <div className="leaderboard-toolbar">
        <div className="leaderboard-timeframe-group">
          <button
            type="button"
            className={`leaderboard-timeframe-btn ${timeframe === "all" ? "active" : ""
              }`}
            onClick={() => setTimeframe("all")}
          >
            Semua Waktu
          </button>
          <button
            type="button"
            className={`leaderboard-timeframe-btn ${timeframe === "month" ? "active" : ""
              }`}
            onClick={() => setTimeframe("month")}
          >
            Bulan Ini
          </button>
          <button
            type="button"
            className={`leaderboard-timeframe-btn ${timeframe === "week" ? "active" : ""
              }`}
            onClick={() => setTimeframe("week")}
          >
            Minggu Ini
          </button>
        </div>

        <div className="leaderboard-search-wrapper">
          <Search className="leaderboard-search-icon size-3.5" />
          <input
            type="text"
            className="leaderboard-search-input"
            placeholder="Cari anggota..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Leaderboard Table Card (Borderless & Leaf-Shaped with Soft Shadow) */}
      <Card className="leaderboard-table-card">
        <CardHeader className="leaderboard-table-header">
          <div className="flex items-center justify-between">
            <CardTitle className="leaderboard-table-title">
              Peringkat Anggota #{otherUsers[0]?.rank || 4} - #
              {otherUsers[otherUsers.length - 1]?.rank || 10}
            </CardTitle>
            <span className="leaderboard-table-count">
              {otherUsers.length} Pengguna
            </span>
          </div>
        </CardHeader>

        <CardContent className="leaderboard-table-content py-0 gap-0">
          <div className="leaderboard-table-head">
            <span className="table-col-rank">
              <span className="table-head-rank-desktop">Peringkat</span>
              <span className="table-head-rank-mobile">#</span>
            </span>
            <span className="table-col-user">Nama Pengguna</span>
            <span className="text-center leaderboard-status-col">Status</span>
            <span className="text-right pr-2 table-col-points">
              <span className="table-head-points-desktop">Eco Points</span>
              <span className="table-head-points-mobile">Poin</span>
            </span>
          </div>

          {otherUsers.length === 0 ? (
            <div className="leaderboard-empty-search">
              <Search className="size-5 text-muted-foreground/50 mb-1" />
              <p className="text-xs font-semibold text-muted-foreground">
                Tidak ada anggota bernama "{searchQuery}"
              </p>
            </div>
          ) : (
            otherUsers.map(({ id, rank, name, status, ecoPoints }) => {
              const isCurrentUser =
                user?.name &&
                name.toLowerCase() === user.name.toLowerCase()

              return (
                <div
                  className={`leaderboard-table-row ${isCurrentUser ? "current-user-row" : ""
                    }`}
                  key={id}
                >
                  <div className="leaderboard-rank-cell">
                    <span className="leaderboard-rank-leaf-pill">
                      #{rank}
                    </span>
                  </div>

                  <div className="leaderboard-user-cell">
                    <UserAvatar name={name} rank={rank} />
                    <div className="leaderboard-user-text">
                      <span className="leaderboard-user-name">{name}</span>
                      {isCurrentUser && (
                        <span className="leaderboard-you-badge">Anda</span>
                      )}
                      <span
                        className={`leaderboard-status mobile-status-tag ${status === "Veteran" ? "veteran" : "anggota"
                          }`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>

                  <div className="text-center leaderboard-status-col">
                    <span
                      className={`leaderboard-status ${status === "Veteran" ? "veteran" : "anggota"
                        }`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="leaderboard-points text-right pr-2">
                    <Leaf className="size-3 inline mr-1 text-emerald-600 opacity-90" />
                    <strong>{formatPoints(ecoPoints)}</strong>
                  </div>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>
    </section>
  )
}

export default Leaderboard