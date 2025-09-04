import prisma from "@/app/lib/prisma"
import { AddProductForm } from "@/components/forms/add-product-form"

export default async function NewProductPage() {
    const categories = await prisma.categories.findMany();
    const types = await prisma.types.findMany();

    return (
        <div className="p-8">
            <AddProductForm
                categories={categories}
                types={types}
                onCancel={() => { /* handle cancel, e.g., redirect or close modal */ }}
                onSuccess={() => { /* handle success, e.g., show message or redirect */ }}
            />
        </div>
    )
}