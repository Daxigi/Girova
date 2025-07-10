import {createClient}  from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest){
    const formData = await request.formData();

    const file = formData.get('file') as File | null;

    if(!file){
        return NextResponse.json(
            {message: "No se ha enviado ningun archivo."},
            {status: 400}
        );
    }

   const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL! ,
        process.env.SUPABASE_SECRET_KEY! 
   ) 

   try
   {
    const filename = `${Date.now()}-${file.name}`;

    const {data, error} = await supabase.storage
        .from('product-images')
        .upload(filename, file, {
            cacheControl: '3600',
            upsert: false,
        });

    const { data: {publicUrl}} = supabase.storage
        .from('product-images')
        .getPublicUrl(data!.path);

    return NextResponse.json(
        {imageUrl: publicUrl},
        {status: 200}
    );
   }
   catch(error)
   {
    console.error(error)
    NextResponse.json(
        {message: "Error interno del servidor."}, 
        { status: 500}
    )
   }
}