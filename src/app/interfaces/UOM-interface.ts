interface IUOM {
  _id: string;
  name: string;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
  status: string;
  Product: {
    name: string;
    code: string;
    image: string;
    Brand: {
      name: string;
    };
  };
  createdAt: string;
}

export { IUOM };
