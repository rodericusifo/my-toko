import { IBrand } from './brand-interface';
import { IProduct } from './product-interface';
import { IUser } from './user-interface';
import { ISupplier } from "./supplier-interface";

interface IData {
  Authorization?: string;
  Users?: IUser[];
  Brands?: IBrand[];
  Products?: IProduct[];
  Suppliers?: ISupplier[];
}

export { IData };
