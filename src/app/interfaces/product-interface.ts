interface IProduct {
  _id: string;
  name: string;
  code: string;
  image: string;
  Brand: {
    name: string;
  };
  createdAt: string;
}

export { IProduct };
