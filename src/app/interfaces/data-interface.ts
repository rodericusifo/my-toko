import { IBrand } from "./brand-interface";
import { ISupplier } from "./supplier-interface";
import { IUser } from "./user-interface";

interface IData {
    Suppliers: ISupplier[];
    Authorization?: string;
    Users?: IUser[];
    Brands?: IBrand[];
    Supplier?: ISupplier[];
}

export { IData };
