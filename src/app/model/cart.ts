import { Product } from "./product";
import { UserSystem } from "./user-system";

export class Cart {
    id?: number;
    quantity?: number;
    lastUpdate?: string;
    product?: Product;
    userSystem?: UserSystem

}
