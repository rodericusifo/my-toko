import { IBrand } from './brand-interface';
import { IProduct } from './product-interface';
import { IUser } from './user-interface';

interface IData {
  Authorization?: string;
  Users?: IUser[];
  Brands?: IBrand[];
  Products?: IProduct[];
}

export { IData };
