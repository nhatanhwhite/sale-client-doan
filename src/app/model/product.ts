import { Category } from "./category";
import { Thoroughbred } from "./thoroughbred";
import { UserSystem } from "./user-system";

export class Product {
    id?:number;
    productName?: string;
    introduce?: string;
    description?: string;
    priceImport?: number;
    priceSell?: number;
    quantityImport?: number;
    quantitySell?: number;
    inventory?: number;
    sale?: number;
    thoroughbred?: Thoroughbred;
    category?: Category;
    lastUpdate?: string;
    userSystem?: UserSystem;
}
