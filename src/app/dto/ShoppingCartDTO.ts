import {Cart} from '../model/cart';
import {ProductDTO} from './product-dto';

export class ShoppingCartDTO {
  productId?: string;
  quantity = 0;
  productDTO = new ProductDTO() as ProductDTO;
}
