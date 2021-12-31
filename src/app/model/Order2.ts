import { Product } from "./product";
import { UserSystem } from "./user-system";
import {ShoppingCartDTO} from '../dto/ShoppingCartDTO';
import {OrderDetail} from './OrderDetail';

export class Order2 {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  address?: string;
  orderDetails: OrderDetail[] = [];

}
