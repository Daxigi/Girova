"use client"

import { Edit, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const coupons = [
  {
    id: 1,
    code: "DESCUENTO20",
    discount: "20%",
    status: "active",
  },
  {
    id: 2,
    code: "VERANO2024",
    discount: "15%",
    status: "active",
  },
  {
    id: 3,
    code: "NAVIDAD2023",
    discount: "30%",
    status: "expired",
  },
  {
    id: 4,
    code: "PRIMERAVEZ",
    discount: "10%",
    status: "active",
  },
]

export function CouponsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestionar Cupones</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Crear Cupón
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Cupones</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código del Cupón</TableHead>
                <TableHead>Descuento</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium font-mono">{coupon.code}</TableCell>
                  <TableCell>{coupon.discount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={coupon.status === "active" ? "default" : "secondary"}
                      className={
                        coupon.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }
                    >
                      {coupon.status === "active" ? "Activo" : "Expirado"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
