import { IOrderProduct } from "./order-product-interface";

interface IOrder {
    _id: string;
    orderNumber?: string;
    orderDate?: string;
    customerName?: string;
    status?: string;
    OrderProducts?: IOrderProduct[];
    subTotal?: number;
    total?: number;
    tax?: number;
    canceledReason?: string;
}

export { IOrder };