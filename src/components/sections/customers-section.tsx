"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const customers = [
  {
    id: 1,
    name: "María García",
    email: "maria.garcia@email.com",
    registrationDate: "2024-01-10",
  },
  {
    id: 2,
    name: "Carlos López",
    email: "carlos.lopez@email.com",
    registrationDate: "2024-01-08",
  },
  {
    id: 3,
    name: "Ana Martínez",
    email: "ana.martinez@email.com",
    registrationDate: "2024-01-05",
  },
  {
    id: 4,
    name: "Luis Rodríguez",
    email: "luis.rodriguez@email.com",
    registrationDate: "2024-01-03",
  },
]

export function CustomersSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestionar Clientes</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Fecha de Registro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.registrationDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
