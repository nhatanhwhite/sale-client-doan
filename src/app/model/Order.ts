import { Product } from "./product";
import { UserSystem } from "./user-system";
import {ShoppingCartDTO} from '../dto/ShoppingCartDTO';
import {OrderDetail} from './OrderDetail';

export class Order {
    id?: number;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    address?: string;
    orderDetail: ShoppingCartDTO[] = [];
    status: number;
    orderDetails: OrderDetail[] = [];

}
