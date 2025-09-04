"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SettingsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Perfil del Administrador</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" placeholder="Tu nombre" defaultValue="Admin Usuario" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" defaultValue="admin@stylehub.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Nueva Contraseña</Label>
            <Input id="password" type="password" placeholder="Dejar en blanco para mantener actual" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
            <Input id="confirm-password" type="password" placeholder="Confirmar nueva contraseña" />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Guardar Cambios</Button>
        </CardContent>
      </Card>
    </div>
  )
}
