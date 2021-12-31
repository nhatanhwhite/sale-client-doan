import { Product } from "./product";
import { UserSystem } from "./user-system";
import {ShoppingCartDTO} from '../dto/ShoppingCartDTO';

export class OrderDetail {
    id?: number;
    quantity: number;
    product: Product;

}
