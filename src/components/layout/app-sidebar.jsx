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
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mainMenu = [
  { label: "Dashboard", page: "dashboard", icon: LayoutDashboard, },
  { label: "AI Waste Scanner", page: "scanner", icon: Camera, },
  { label: "Recycling Map", page: "recycling-map", icon: Map, },
  { label: "Leaderboard", page: "leaderboard", icon: Trophy, },
]

const accountMenu = [
  { label: "Notifikasi", icon: Bell },
  { label: "Profil", icon: UserCircle },
]

export function AppSidebar({ activePage, onNavigate }) {
  return (
    <Sidebar className="ecocycle-sidebar">
      <SidebarHeader>
        <div className="sidebar-brand">
          <span className="sidebar-brand-icon">♻</span>
          <span>EcoCycle AI</span>
        </div>

      </SidebarHeader>

      <SidebarContent>
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
                      className={isActive ? "sidebar-menu-active" : ""}
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

        <SidebarGroup>
          <SidebarGroupLabel>Akun</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {accountMenu.map(({ label, icon: Icon }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton type="button" tooltip={label}>
                    <Icon />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton type="button" className="logout-menu-button">
              <LogOut />
              <span>Keluar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}