import { ProductDTO } from './product.dto';
import { ListBuilder } from '../builder/list.builder';

import { Product } from '@/application/domain/entity/product.entity';

export class ProductsDTO extends ListBuilder<Product, ProductDTO>(ProductDTO) {}
