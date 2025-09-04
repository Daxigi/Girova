"use client"

import { Edit, Trash2, Plus, RefreshCw } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useTableFilters, type FilterState } from "@/hooks/use-table-filters"
import { TableFilters, StatusFilter, PriceRangeFilter } from "@/components/filters/table-filters"
import { useState } from "react"
import { AddProductForm } from "@/components/forms/add-product-form"
import { updateProductStatus } from "@/actions/product-actions"
import type { Product, Categories, Types } from "@/generated/prisma"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ProductsSectionProps {
  initialProducts: Product[];
  categories: Categories[];
  types: Types[];
}

const statusOptions = [
  { value: "active", label: "Activo" },
  { value: "inactive", label: "Desactivado" },
]

export function ProductsSection({ initialProducts, categories, types }: ProductsSectionProps) {
  const [showAddForm, setShowAddForm] = useState(false)

  const productFilter = (product: Product, filters: FilterState) => {
    const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase())
    const matchesStatus = !filters.status || (filters.status === "active" ? product.status === true : product.status === false)
    const matchesPriceMin = filters.priceMin === undefined || Number(product.price) >= filters.priceMin
    const matchesPriceMax = filters.priceMax === undefined || Number(product.price) <= filters.priceMax

    return matchesSearch && matchesStatus && matchesPriceMin && matchesPriceMax
  }

  const { filteredData, updateFilter, clearFilters, filters } = useTableFilters(initialProducts, productFilter)
  const activeFiltersCount = [filters.search, filters.status, filters.priceMin, filters.priceMax].filter(Boolean).length

  const handleToggleStatus = async (productId: string, newStatus: boolean) => {
    const message = newStatus ? '¿Estás seguro de que quieres activar este producto?' : '¿Estás seguro de que quieres desactivar este producto?';
    if (confirm(message)) {
      const result = await updateProductStatus({ productId, status: newStatus });
      alert(result.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestionar Productos</h1>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Agregar Producto
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-6">
          <AddProductForm
            categories={categories}
            types={types}
            onCancel={() => setShowAddForm(false)}
            onSuccess={() => setShowAddForm(false)}
          />
        </div>
      )}

      <TableFilters
        searchValue={filters.search}
        onSearchChange={(value) => updateFilter("search", value)}
        onClearFilters={clearFilters}
        activeFiltersCount={activeFiltersCount}
      >
        <StatusFilter
          value={filters.status || ""}
          onValueChange={(value) => updateFilter("status", value)}
          options={statusOptions}
          placeholder="Estado"
        />
        <PriceRangeFilter
          minValue={filters.priceMin}
          maxValue={filters.priceMax}
          onMinChange={(value) => updateFilter("priceMin", value)}
          onMaxChange={(value) => updateFilter("priceMax", value)}
        />
      </TableFilters>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Lista de Productos
            <Badge variant="secondary">
              {filteredData.length} de {initialProducts.length} productos
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No se encontraron productos que coincidan con los filtros
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Image
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>${Number(product.price).toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge
                        variant={product.status === true ? "default" : "destructive"}
                        className={product.status === true ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}
                      >
                        {product.status === true ? "Activo" : "Desactivado"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link href={`/admin/products/edit/${product.id}`}>
                                <Button variant="ghost" size="icon">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent><p>Editar Producto</p></TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {product.status === true ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" onClick={() => handleToggleStatus(product.id, false)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent><p>Desactivar Producto</p></TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700" onClick={() => handleToggleStatus(product.id, true)}>
                                  <RefreshCw className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent><p>Activar Producto</p></TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}