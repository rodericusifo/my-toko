import { IPOProduct } from 'src/app/interfaces/PO-product-interface';

interface IDO {
  quantity: number;
  _id: string;
  DONumber: string;
  DODate: string;
  POProduct: IPOProduct;
  createdAt: string;
}

export { IDO };
