"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PurchaseSuccess = () => {
  // urlからパラメータを取得
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  // 記事のIDを取得
  const [bookUrl, setBookUrl] = useState(null);

  // 購入履歴をDBに保存する
  useEffect(() => {
    const fetchData = async () => {
      if (sessionId) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/checkout/success`,
            {
              method: "POST",
              headers: { "content-Type": "application/json" },
              body: JSON.stringify({ sessionId }),
            },
          );

          // 戻り値をを取得
          const data = await response.json();

          // bookIdを取得
          setBookUrl(data.purchase.bookId);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          購入ありがとうございます！
        </h1>
        <p className="text-center text-gray-600">
          ご購入いただいた内容の詳細は、登録されたメールアドレスに送信されます。
        </p>
        <div className="mt-6 text-center">
          <Link
            href={`/book/${bookUrl}`}
            className="text-indigo-600 hover:text-indigo-800 transition duration-300"
          >
            購入した記事を読む
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
