"use client"

import { LayoutDashboard, Package, ShoppingCart, Users, Ticket, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navigationItems = [
  {
    title: "Inicio",
    icon: LayoutDashboard,
    id: "dashboard",
  },
  {
    title: "Productos",
    icon: Package,
    id: "products",
  },
  {
    title: "Ventas",
    icon: ShoppingCart,
    id: "sales",
  },
  {
    title: "Clientes",
    icon: Users,
    id: "customers",
  },
  {
    title: "Cupones",
    icon: Ticket,
    id: "coupons",
  },
]

interface AdminSidebarProps {
  activeSection?: string
  onSectionChange?: (section: string) => void
}

export function AdminSidebar({ activeSection = "products", onSectionChange }: AdminSidebarProps) {
  return (
    <Sidebar className="bg-gray-900 text-white">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">StyleHub Admin</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange?.(item.id)}
                    isActive={activeSection === item.id}
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 data-[active=true]:bg-blue-600 data-[active=true]:text-white"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => onSectionChange?.("settings")}
              isActive={activeSection === "settings"}
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 data-[active=true]:bg-blue-600 data-[active=true]:text-white"
            >
              <Settings className="w-5 h-5" />
              <span>Configuración</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
