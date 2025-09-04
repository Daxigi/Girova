import prisma from "@/app/lib/prisma"
import AdminPageClient from "@/components/admin-page-client"

export default async function AdminDashboardPage(){
  const products = await prisma.product.findMany();
  const categories = await prisma.categories.findMany();
  const types = await prisma.types.findMany();

  return (
    <AdminPageClient
      initialProducts ={products}
      categories = {categories}
      types = {types}
    />
  );
}