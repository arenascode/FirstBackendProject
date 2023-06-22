export const adminUserDocument = {
  email: "adminCoder@coder.com",
  password: "adminCod3r123",
};

export const userDocument = {
  email: 'migue.arenas91@gmail.com',
  password: '0000'
}

export const productDocument = {
  // _id: "645c409e3ccd6ebac43446e8",
  title: "Bugatti",
  description: "Veyron",
  code: "001",
  price: 1900000,
  status: true,
  stock: 5,
  category: "hyper-sports",
  thumbnails: [""],
};

export const cartDocument = {
  id: "6463bf4d2a3c364b7cf26057",
  user: "6463bdbd5031370f8b1a0776",
  products: [
    {
      _id: "647e6f3d957a3ee0010c0ca4",
      quantity: "1",
    },
  ],
};

export const userDto = {
  fullName: 'Miguel Arenas',
  email: "migue.arenas91@gmail.com",
  role: "user",
};