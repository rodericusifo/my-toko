import { IPOProduct } from 'src/app/interfaces/PO-product-interface';
import { IBrand } from './brand-interface';
import { IProduct } from './product-interface';
import { IUser } from './user-interface';
import { ISupplier } from './supplier-interface';
import { IUOM } from './UOM-interface';
import { IPO } from './PO-interface';
import { IDO } from './DO-interface';
import { IOrder } from './order-interface';
import { IOrderProduct } from './order-product-interface';

interface IData {
  Authorization?: string;
  Users?: IUser[];
  Brands?: IBrand[];
  Products?: IProduct[];
  Suppliers?: ISupplier[];
  UOMList?: IUOM[];
  POList?: IPO[];
  PO?: IPO;
  POProductList?: IPOProduct[];
  DOList?: IDO[];
  Invoices?: any;
  APList?: any;
  Orders?: IOrder[];
  OrderProductList?: IOrderProduct[];
  ARList?: any;
}

export { IData };
