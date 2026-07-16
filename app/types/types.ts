import PurchaseSuccess from "../book/checkout-success/page";

type BookType = {
  id: string;
  title: string;
  content: string;
  price: number;
  thumbnail: { url: string };
  createdAt: string;
  updatedAt: string;
};

type User = {
  id?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

type Purchase = {
  id: string;
  userId: String;
  bookId: String;
  createdAt: string;
  user: User;
};

export type { BookType, User, Purchase };
