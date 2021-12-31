import { Category } from "../model/category";
import { ProductImage } from "../model/product-image";
import { Thoroughbred } from "../model/thoroughbred";
import { UserSystem } from "../model/user-system";

export class ProductDTO {
    id?: number;
    productName?: string;
    introduce?: string;
    description?: string;
    priceImport?: number;
    priceSell?: number;
    quantityImport?: number;
    quantitySell?: number;
    inventory?: number;
    sale?: number;
    lastUpdate?: string;
    productImages?: ProductImage[] = [];
    thoroughbred?: Thoroughbred;
    category?: Category;
    userSystem?: UserSystem;
}
