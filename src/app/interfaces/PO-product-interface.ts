interface IPOProduct {
  _id: string;
  UOM: {
    _id: string;
    name: string;
    purchasePrice?: number;
    Product: {
      _id: string;
      name: string;
    };
  };
  PO?: {
    _id: string;
    PONumber: string;
  };
  remaining?: number;
  quantity?: number;
  amount?: number;
}

export { IPOProduct };
