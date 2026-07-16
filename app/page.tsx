// "use client";

// import { useEffect, useState } from "react";
// import Book from "./components/Book";
// import { getAllBooks } from "./lib/micro-cms/crient";
// import { BookType } from "./types/types";

// // eslint-disable-next-line @next/next/no-async-client-component
// export default function Home() {
//   // Bookを保持するステイト
//   const [books, setBooks] = useState<BookType[]>([]);

//   // microCMSからデータを取得する
//   async function getBooksFromMicroCMS() {
//     const { contents } = await getAllBooks();
//     console.log(contents);
//     setBooks(contents);
//   }

//   useEffect(() => {
//     getBooksFromMicroCMS();
//   }, []);

//   return (
//     <>
//       <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
//         <h2 className="text-center w-full font-bold text-3xl mb-2">
//           Book Commerce
//         </h2>
//         {books.map((book: any) => (
//           <Book key={book.id} book={book} />
//         ))}
//       </main>
//     </>
//   );
// }

import { getServerSession } from "next-auth";
import Book from "./components/Book";
import { getAllBooks } from "./lib/micro-cms/crient";
import { BookType, Purchase, User } from "./types/types";
import { nextAuthOptions } from "./lib/next-auth/options";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  // microCMSからデータを取得する
  const { contents } = await getAllBooks();

  // サーバーサイドでセッションを取得する方法
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;

  // 購入済みのBookId一覧
  let purchasesBookIdList: string[];

  // ユーザーがログインしているかチェック
  if (user) {
    // 購入履歴を取得する
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,
      { cache: "no-store" },
    );
    const purchasesData = await response.json();

    // 購入済みのBookIdを取得し、一覧にまとめる
    purchasesBookIdList = purchasesData.map(
      (purchaseBook: Purchase) => purchaseBook.bookId,
    );
  }

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        {contents.map((book: BookType) => (
          <Book
            key={book.id}
            book={book}
            isPurchases={purchasesBookIdList.includes(book.id)}
          />
        ))}
      </main>
    </>
  );
}
