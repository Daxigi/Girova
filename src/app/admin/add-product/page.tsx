"use client"

import { AddProductForm } from "@/components/forms/add-product-form"

export default function AddProductPage() {
  const handleSave = (data: any) => {
    console.log("Datos del producto:", data)
    // Aquí integrarías con tu API para guardar el producto
    alert("Producto guardado exitosamente!")
  }

  const handleCancel = () => {
    console.log("Formulario cancelado")
    // Aquí podrías redirigir de vuelta a la lista de productos
  }

  return (
    <div className="container mx-auto py-8">
      <AddProductForm onSave={handleSave} onCancel={handleCancel} />
    </div>
  )
}
