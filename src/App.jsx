import { useState } from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import Dashboard from "@/pages/Dashboard"
import AIScanner from "@/pages/AIScanner"
import RecycleMap from "@/pages/RecycleMap"
import Leaderboard from "@/pages/Leaderboard"
import "./App.css"

function App() {
  const [activePage, setActivePage] = useState("dashboard")

  return (
    <SidebarProvider>
      <AppSidebar
      activePage={activePage}
      onNavigate={setActivePage}
      />

      <SidebarInset className="dashboard-inset">
        <Navbar activePage={activePage} />

        <main className="dashboard-content">
          {activePage === "dashboard" && <Dashboard />}
          {activePage === "scanner" && <AIScanner />}
          {activePage === "recyclemap" && <RecycleMap />}
          {activePage === "leaderboard" && <Leaderboard />}
        </main>

        <Footer />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App