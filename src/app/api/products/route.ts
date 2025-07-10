import { NextResponse } from "next/server";
import prisma from '@/app/lib/prisma'
import { ProductRequestBody } from "@/types";

export async function GET(request: Request){
    try{
        const products = await prisma.product.findMany();

        return NextResponse.json(products, {status: 200});
    }catch (error) {
        console.error("Error al obtener los productos", error);

        return NextResponse.json(
            {message: "No se pudieron obtener los productos."},
            {status: 500}
        )
    }
}

export async function POST(request: Request){
    try
    {
        const body: ProductRequestBody = await request.json();
        
        const { 
            name,
            description,
            price,
            purchasePrice,
            stock,
            imageUrl
            } = body;

        if(!name || !price || !stock){
            return NextResponse.json(
            {message: " Faltan campos requeridos (Nombre, Precio, Stock)."},
            {status: 400}
            );
        }

        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price,
                purchasePrice,
                stock,
                imageUrl,
            },
        });

        return NextResponse.json(newProduct, {status:201});
    }
    catch(error)
    {
        console.log("Error al crear el producto:", error);

        return NextResponse.json(
            { message: "No se pudo crear el producto."},
            { status: 500}
        )
    }
}