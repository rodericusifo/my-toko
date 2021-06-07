import { ISupplier } from 'src/app/interfaces/supplier-interface';
import { IPOProduct } from './PO-product-interface';

interface IPO {
  _id: string;
  PONumber?: string;
  PODate?: string;
  shipTo?: {
    name: string;
    companyName: string;
    email: string;
    phoneNumber: string;
  };
  POProducts?: IPOProduct[];
  subTotal?: number;
  total?: number;
  INVCreated?: boolean;
  Supplier?: ISupplier;
  createdAt?: string;
}

export { IPO };
