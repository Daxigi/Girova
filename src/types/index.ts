import { Product as PrismaProduct} from '@/generated/prisma'

export type Product = PrismaProduct;

export interface ProductRequestBody {
    name: string;
    description?: string;
    price: number;
    purchasePrice?: number;
    stock: number;
    imageUrl?: string;
}