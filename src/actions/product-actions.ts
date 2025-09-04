'use server';

import prisma from '@/app/lib/prisma';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const ProductSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.coerce.number().min(0, 'El precio no puede ser negativo'),
  purchasePrice: z.coerce.number().min(0, 'El precio de compra no puede ser negativo'),
  stock: z.coerce.number().int().min(0, 'El stock no puede ser negativo'),
  imageUrl: z.string().min(1, "Debes proporcionar una URL para la imagen."),
  CategoryId: z.coerce.number(),
  TypeId: z.coerce.number(),
});

// Esta es la Server Action que se ejecuta en el servidor.
export async function createProduct(formData: FormData) {
    // Se convierten los datos del formulario a un objeto simple.
    const rawFormData = Object.fromEntries(formData.entries());
  
    // Se validan los datos usando el esquema de Zod.
    const validatedFields = ProductSchema.safeParse(rawFormData);
  
    // Si la validación falla, se retornan los errores.
    if (!validatedFields.success) {
      console.error("Errores de validación:", validatedFields.error.flatten().fieldErrors);
      return {
        success: false,
        message: 'Validación fallida. Revisa los datos.',
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
  
    try {
      // Si la validación es exitosa, se crea el producto en la base de datos.
      await prisma.product.create({
        data: validatedFields.data,
      });
    } catch (error) {
      console.error("Error al crear el producto:", error);
      return {
        success: false,
        message: 'Error de base de datos: No se pudo crear el producto.',
      };
    }
  
    // Se refresca la caché de la página de productos para mostrar el nuevo item.
    revalidatePath('/admin/products');
    
    return { success: true, message: 'Producto creado exitosamente.' };
  }

export async function updateProductStatus({productId, status}:{ productId: string; status: boolean}){
    if(!productId){
        return {success:false, message: 'Se requiere del ID del producto.'}
    }

    try {
        await prisma.product.update({
            where: {id: productId},
            data: {status: status},
        });
    }catch (error){
        console.error("Error al actualizar el estado del producto")
        return{
        success: false,
        message: 'Error en la base de datos, no se pudo actualizar el estado del producto,',
    }}

    revalidatePath('/admin/products');
    const message = status ? 'Producto activado exitosamente.' : 'Producto desactivado exitosamente.';  
    return {success: true, message: message};
}