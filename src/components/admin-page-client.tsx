"use client"

import type {Product, Categories, Types} from "@/generated/prisma"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { ProductsSection } from "@/components/sections/products-section"
import { SalesSection } from "@/components/sections/sales-section"
import { CustomersSection } from "@/components/sections/customers-section"
import { CouponsSection } from "@/components/sections/coupons-section"
import { SettingsSection } from "@/components/sections/settings-section"
import { DashboardSection } from "@/components/sections/dashboard-section"
import { SidebarInset } from "@/components/ui/sidebar"
import { init } from "next/dist/compiled/webpack/webpack"

interface AdminPageClientProps {
    initialProducts: Product[];
    categories: Categories[];
    types: Types[];
}

export default function AdminPageClient({
    initialProducts,
    categories,
    types
}: AdminPageClientProps) {
  const [activeSection, setActiveSection] = useState("products")

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection />
      case "products":
        return <ProductsSection
                    initialProducts={initialProducts}
                    categories={categories}
                    types={types}        
        />
      case "sales":
        return <SalesSection />
      case "customers":
        return <CustomersSection />
      case "coupons":
        return <CouponsSection />
      case "settings":
        return <SettingsSection />
      default:
        return <ProductsSection 
                initialProducts={initialProducts}
                categories={categories}
                types={types}       
        />
    }
  }

  return (
    <>
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <SidebarInset>
        <div className="p-6">{renderSection()}</div>
      </SidebarInset>
    </>
  )
}
