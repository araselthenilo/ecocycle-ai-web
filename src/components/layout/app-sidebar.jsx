import {
  Bell,
  Camera,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Map,
  Plus,
  ScanLine,
  Trophy,
  UserCircle,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

const mainMenu = [
  { label: "Dashboard", page: "dashboard", icon: LayoutDashboard, },
  { label: "AI Waste Scanner", page: "scanner", icon: Camera, },
  { label: "Recycling Map", page: "recyclemap", icon: Map, },
  { label: "Leaderboard", page: "leaderboard", icon: Trophy, },
]

const accountMenu = [
  { label: "Notifikasi", page: "notifications", icon: Bell },
  { label: "Profil", page: "profile", icon: UserCircle },
]

export function AppSidebar({ activePage, onNavigate }) {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/", { replace: true })
  }
  return (
    <Sidebar className="ecocycle-sidebar border-r-0 pb-5">
      <SidebarHeader className="bg-white border-b border-black/8 px-4 py-3.5">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="sidebar-brand flex items-center gap-2.5 text-left w-full cursor-pointer hover:opacity-85 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-md"
        >
          <img
            src="/ecocycle-logo.svg"
            alt="EcoCycle AI Logo"
            className="size-8.5 shrink-0 object-contain drop-shadow-xs"
          />
          <span className="font-heading font-bold text-base sm:text-lg text-primary tracking-tight select-none">
            EcoCycle AI
          </span>
        </button>
      </SidebarHeader>

      <SidebarContent className="pb-2">
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenu.map(({ label, page, icon: Icon }) => {
                const isActive = activePage === page

                return (
                  <SidebarMenuItem key={page}>
                    <SidebarMenuButton
                      type="button"
                      isActive={isActive}
                      tooltip={label}
                      onClick={() => onNavigate(page)}
                      className={"cursor-pointer pl-5 py-5 mt-1 gap-3 " + (isActive ? "sidebar-menu-active" : "")}
                    >
                      <Icon />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="mt-1 mx-3 !bg-white/50 !h-[2px] rounded-full" />

        <SidebarGroup>
          <SidebarGroupLabel>Akun</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountMenu.map(({ label, page, icon: Icon }) => {
                const isActive = page && activePage === page

                return (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton
                      type="button"
                      isActive={isActive}
                      tooltip={label}
                      onClick={() => (page ? onNavigate(page) : null)}
                      className={"cursor-pointer pl-5 py-5 mt-1 gap-3 " + (isActive ? "sidebar-menu-active" : "")}
                    >
                      <Icon />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator className="mx-3 bg-white/15" />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              type="button"
              className="cursor-pointer pl-5 py-5 mt-1 gap-3 logout-menu-button"
              onClick={handleLogout}
            >
              <LogOut />
              <span>Keluar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}