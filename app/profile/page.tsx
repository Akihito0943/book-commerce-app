import { getServerSession } from "next-auth";
import Image from "next/image";
import { nextAuthOptions } from "../lib/next-auth/options";
import { BookType, Purchase, User } from "../types/types";
import { getDetailBook } from "../lib/micro-cms/crient";
import PurchaseDetailBook from "../components/PurchaseDetailBook";

export default async function ProfilePage() {
  // サーバーサイドでセッションを取得する方法
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;

  // 購入履歴を保持する配列
  let purchasesBookDetails: BookType[] = [];

  // 購入履歴を取得しプロフィールに表示
  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,
      { cache: "no-store" },
    );
    const purchasesData = await response.json();

    // bookIdから記事の詳細を取得
    purchasesBookDetails = await Promise.all(
      purchasesData.map(async (purchaseBook: Purchase) => {
        const bookId = purchaseBook.bookId;
        return await getDetailBook(purchaseBook.bookId);
      }),
    );

    console.log(purchasesBookDetails);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">プロフィール</h1>

      <div className="bg-white shadow-md rounded p-4">
        <div className="flex items-center">
          <Image
            priority
            src={user.image || "/default_icon.png"}
            alt="user profile_icon"
            width={60}
            height={60}
            className="rounded-full"
          />
          <h2 className="text-lg ml-4 font-semibold">お名前：{user.name}</h2>
        </div>
      </div>

      <span className="font-medium text-lg mb-4 mt-4 block">購入した記事</span>
      <div className="flex items-center gap-6">
        {purchasesBookDetails.map((purchaseData: BookType) => {
          return (
            <PurchaseDetailBook
              key={purchaseData.id}
              purchaseData={purchaseData}
            />
          );
        })}
      </div>
    </div>
  );
}
