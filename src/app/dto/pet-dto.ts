import { Category } from "../model/category";
import { Thoroughbred } from "../model/thoroughbred";
import { UserSystem } from "../model/user-system";

export class PetDTO {
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
    image?: string;
    thoroughbred?: Thoroughbred;
    category?: Category;
    userSystem?: UserSystem;

}
