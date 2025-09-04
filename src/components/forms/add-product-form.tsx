"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {createProduct} from "@/actions/product-actions"
import type { Categories, Types} from "@/generated/prisma"

interface AddProductFormProps {
  categories: Categories[];
  types: Types[];
  onCancel: ()=> void;
  onSuccess: ()=> void;
}

export function AddProductForm({ onCancel, onSuccess, categories = [], types = []}: AddProductFormProps) {
  const [textFields, setTextFields] = useState({
    name: "",
    description: "",
    price: "",
    purchasePrice: "",
    stock: "",
    imageUrl: "",
    CategoryId: "",
    TypeId: ""
  })

  const [file, setFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setTextFields(prev => ({...prev, [name]: value}));
  }

  const handleSelectChange = (field: "CategoryId" | "TypeId", value: string) => {
    setTextFields((prev) => ({...prev, [field]: value}));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!file){
      alert("Por favor, selecciona una imagen para el producto");
      return
    }

    setIsSubmitting(true);

    try{
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append('file', file);
      cloudinaryFormData.append('upload_preset', 'girova_products');

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/dcuunfp9t/image/upload`,
        {method: 'POST', body: cloudinaryFormData}
      );
      const cloudinaryData = await cloudinaryRes.json();
      const imageUrl = cloudinaryData.secure_url;

      if(!imageUrl){
        throw new Error('Fallo la subida de la imagen a Cloudinary');
      }

      const serverFormData = new FormData();
      Object.entries(textFields).forEach(([key, value]) => {
        serverFormData.append(key, value);
      });

      serverFormData.append('imageUrl', imageUrl) 

      const result = await createProduct(serverFormData);

      if(result?.success){
        alert(result.message ?? "Producto creado exitosamente.");
        onSuccess();
      } else {
        const errorMessages = Object.values(result?.errors ?? {}).flat().join('\n');
        throw new Error((result?.message ?? "Error al crear el producto") + '\n' + errorMessages);
      }
    } catch (error) {
      console.error('Error al guardar el producto', error);
      alert((error as Error).message);
    }finally{
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setTextFields({
      name: "",
      description: "",
      price: "",
      purchasePrice: "",
      stock: "",
      imageUrl: "",
      CategoryId: "",
      TypeId: ""
    })
    onCancel?.()
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Agregar Nuevo Producto</CardTitle>
        <CardDescription>Completa los detalles del producto a continuación.</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" name="name" value={textFields.name} onChange={handleInputChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" name="description" value={textFields.description} onChange={handleInputChange} rows={4} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price">Precio</Label>
              <Input id="price" name="price" type="number" value={textFields.price} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purchasePrice">Precio de Compra</Label>
              <Input id="purchasePrice" name="purchasePrice" type="number" value={textFields.purchasePrice} onChange={handleInputChange} required />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input id="stock" name="stock" type="number" value={textFields.stock} onChange={handleInputChange} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select name="CategoryId" onValueChange={(value) => handleSelectChange("CategoryId", value)} required>
                <SelectTrigger><SelectValue placeholder="Selecciona..." /></SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => <SelectItem key={cat.id.toString()} value={cat.id.toString()}>{cat.description}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select name="TypeId" onValueChange={(value) => handleSelectChange("TypeId", value)} required>
                <SelectTrigger><SelectValue placeholder="Selecciona..." /></SelectTrigger>
                <SelectContent>
                  {types.map((t) => <SelectItem key={t.id.toString()} value={t.id.toString()}>{t.description}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageFile">Imagen del Producto</Label>
            <Input
              id="imageFile"
              name="imageFile"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                }
              }}
              required
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar Producto"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}