import { IBrand } from './brand-interface';
import { IProduct } from './product-interface';
import { IUser } from './user-interface';
import { ISupplier } from './supplier-interface';
import { IUOM } from './UOM-interface';
import { IPO } from './PO-interface';

interface IData {
  Authorization?: string;
  Users?: IUser[];
  Brands?: IBrand[];
  Products?: IProduct[];
  Suppliers?: ISupplier[];
  UOMList?: IUOM[];
  POList?: IPO[];
  PO?: IPO;
}

export { IData };
