"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const sales = [
  {
    id: "VTA-001",
    customer: "María García",
    date: "2024-01-15",
    total: 159.98,
    status: "paid",
  },
  {
    id: "VTA-002",
    customer: "Carlos López",
    date: "2024-01-14",
    total: 89.99,
    status: "pending",
  },
  {
    id: "VTA-003",
    customer: "Ana Martínez",
    date: "2024-01-13",
    total: 249.97,
    status: "paid",
  },
  {
    id: "VTA-004",
    customer: "Luis Rodríguez",
    date: "2024-01-12",
    total: 79.99,
    status: "cancelled",
  },
]

export function SalesSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestionar Ventas</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Ventas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID de Venta</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado del Pago</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>${sale.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        sale.status === "paid" ? "default" : sale.status === "pending" ? "secondary" : "destructive"
                      }
                      className={
                        sale.status === "paid"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : sale.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                            : ""
                      }
                    >
                      {sale.status === "paid" ? "Pagado" : sale.status === "pending" ? "Pendiente" : "Cancelado"}
                    </Badge>
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
