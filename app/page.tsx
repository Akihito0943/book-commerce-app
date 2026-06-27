"use client";

import { useEffect, useState } from "react";
import Book from "./components/Book";
import { getAllBooks } from "./lib/micro-cms/crient";
import { BookType } from "./types/types";

// eslint-disable-next-line @next/next/no-async-client-component
export default function Home() {
  // Bookを保持するステイト
  const [books, setBooks] = useState<BookType[]>([]);

  // microCMSからデータを取得する
  async function getBooksFromMicroCMS() {
    const { contents } = await getAllBooks();
    console.log(contents);
    setBooks(contents);
  }

  useEffect(() => {
    getBooksFromMicroCMS();
  }, []);

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        {books.map((book: any) => (
          <Book key={book.id} book={book} />
        ))}
      </main>
    </>
  );
}
