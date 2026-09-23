import {
  Bell,
  Camera,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Map,
  PanelLeft,
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
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

const mainMenu = [
  { label: "Dashboard", page: "dashboard", icon: LayoutDashboard },
  { label: "AI Waste Scanner", page: "scanner", icon: Camera },
  { label: "Recycling Map", page: "recyclemap", icon: Map },
  { label: "Leaderboard", page: "leaderboard", icon: Trophy },
]

const accountMenu = [
  { label: "Notifikasi", page: "notifications", icon: Bell },
  { label: "Profil", page: "profile", icon: UserCircle },
]

export function AppSidebar({ activePage, onNavigate }) {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { toggleSidebar } = useSidebar()

  const handleLogout = () => {
    logout()
    navigate("/", { replace: true })
  }

  return (
    <Sidebar collapsible="icon" className="ecocycle-sidebar border-r-0 pb-5">
      <SidebarHeader className="bg-white border-b border-black/8 px-4 py-3.5 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-3.5 transition-all">
        <button
          type="button"
          onClick={toggleSidebar}
          title="Toggle Sidebar (Ctrl+B)"
          className="sidebar-brand group/header flex items-center justify-between w-full cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-md group-data-[collapsible=icon]:justify-center"
        >
          <div className="flex items-center gap-2.5 text-left select-none group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-full">
            <img
              src="/ecocycle-logo.svg"
              alt="EcoCycle AI Logo"
              className="size-8.5 shrink-0 object-contain drop-shadow-xs"
            />
            <span className="font-heading font-bold text-base sm:text-lg text-primary tracking-tight select-none group-data-[collapsible=icon]:hidden">
              EcoCycle AI
            </span>
          </div>

          <span
            className="hidden md:inline-flex items-center justify-center size-8 rounded-lg text-eco-muted transition-all duration-200 group-hover/header:text-eco-green group-hover/header:bg-eco-green/10 group-data-[collapsible=icon]:hidden shrink-0"
            title="Perkecil Menu (Ctrl+B)"
          >
            <PanelLeft className="size-5 transition-transform duration-200 group-hover/header:scale-105" />
          </span>
        </button>
      </SidebarHeader>

      <SidebarContent className="pb-2">
        <SidebarGroup className="group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2">
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="group-data-[collapsible=icon]:items-center">
              {mainMenu.map(({ label, page, icon: Icon }) => {
                const isActive = activePage === page

                return (
                  <SidebarMenuItem key={page} className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
                    <SidebarMenuButton
                      type="button"
                      isActive={isActive}
                      tooltip={label}
                      onClick={() => onNavigate(page)}
                      className={
                        "cursor-pointer transition-all duration-150 pl-5 py-5 mt-1 gap-3 " +
                        "group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:size-11 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:rounded-xl group-data-[collapsible=icon]:mt-1.5 " +
                        (isActive ? "sidebar-menu-active" : "")
                      }
                    >
                      <Icon className="shrink-0 size-5 group-data-[collapsible=icon]:size-5.5" />
                      <span className="group-data-[collapsible=icon]:hidden">{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="mt-1 mx-3 !bg-white/50 !h-[2px] rounded-full group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:w-8" />

        <SidebarGroup className="group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2">
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Akun</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="group-data-[collapsible=icon]:items-center">
              {accountMenu.map(({ label, page, icon: Icon }) => {
                const isActive = page && activePage === page

                return (
                  <SidebarMenuItem key={label} className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
                    <SidebarMenuButton
                      type="button"
                      isActive={isActive}
                      tooltip={label}
                      onClick={() => (page ? onNavigate(page) : null)}
                      className={
                        "cursor-pointer transition-all duration-150 pl-5 py-5 mt-1 gap-3 " +
                        "group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:size-11 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:rounded-xl group-data-[collapsible=icon]:mt-1.5 " +
                        (isActive ? "sidebar-menu-active" : "")
                      }
                    >
                      <Icon className="shrink-0 size-5 group-data-[collapsible=icon]:size-5.5" />
                      <span className="group-data-[collapsible=icon]:hidden">{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator className="mt-1 mx-3 !bg-white/50 !h-[2px] rounded-full group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:w-8" />

      <SidebarFooter className="group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2">
        <SidebarMenu className="group-data-[collapsible=icon]:items-center">
          <SidebarMenuItem className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
            <SidebarMenuButton
              type="button"
              tooltip="Keluar"
              className={
                "cursor-pointer transition-all duration-150 logout-menu-button pl-5 py-5 mt-1 gap-3 " +
                "group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:size-11 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:rounded-xl group-data-[collapsible=icon]:mt-1.5"
              }
              onClick={handleLogout}
            >
              <LogOut className="shrink-0 size-5 group-data-[collapsible=icon]:size-5.5" />
              <span className="group-data-[collapsible=icon]:hidden">Keluar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}