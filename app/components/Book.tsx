"use client";

import Image from "next/image";
import Link from "next/link";
import { BookType } from "../types/types";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type BookProps = {
  book: BookType;
};

// eslint-disable-next-line react/display-name
const Book = ({ book }: BookProps) => {
  // リダイレクト用のルーター
  const router = useRouter();

  // セッションを取得する
  const { data: session } = useSession();
  const user = session?.user;

  // モーダルの状態を管理するステイト
  const [showModal, setShowModal] = useState(false);

  // モーダルの状態を表示にするハンドラ
  const handleShow = () => {
    setShowModal(true);
  };

  // モーダルの状態を非表示にするハンドラ
  const handleCancel = () => {
    setShowModal(false);
  };

  //  モーダルの購入ボタンが押された時のハンドラ
  const handlePurchase = () => {
    // ユーザーがログインしているか
    if (!user) {
      setShowModal(false);
      // ログインページにリダイレクト
      router.push("/login");
    } else {
      // stripeで決済する
    }
  };

  return (
    <>
      {/* アニメーションスタイル */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .modal {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <div className="flex flex-col items-center m-4">
        <a
          onClick={handleShow}
          className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
        >
          <Image
            priority
            src={book.thumbnail.url}
            alt={book.title}
            width={450}
            height={350}
            className="rounded-t-md"
          />
          <div className="px-4 py-4 bg-slate-100 rounded-b-md">
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="mt-2 text-lg text-slate-600">この本は○○...</p>
            <p className="mt-2 text-md text-slate-700">値段：{book.price}</p>
          </div>
        </a>

        {showModal && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900/50 flex justify-center items-center modal">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl mb-4">本を購入しますか？</h3>
              <button
                onClick={handlePurchase}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                購入する
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Book;
