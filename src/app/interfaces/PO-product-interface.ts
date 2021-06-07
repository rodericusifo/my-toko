interface IPOProduct {
  _id: string;
  UOM: {
    _id: string;
    name: string;
    purchasePrice: number;
    Product: {
      _id: string;
      name: string;
    };
  };
  remaining: number;
  quantity: number;
  amount: number;
}

export { IPOProduct };
