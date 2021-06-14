interface IOrderProduct {
    quantity?: number;
    amount?: number;
    UOM: {
        _id: string;
        name: string;
        purchasePrice?: number;
        Product: {
            _id: string;
            name: string;
        };
    };
}

export { IOrderProduct };