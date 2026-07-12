import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Stripeの初期化
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// 購入履歴の保存
export async function POST(request: Request, response: Response) {
  // requestからセッション情報を取得する
  const { sessionId } = await request.json();

  try {
    // sessionから購入情報を取得
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // 購入履歴があるかチェック（リロード時の重複購入を避けるため）
    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: session.client_reference_id!,
        bookId: session.metadata?.bookId!,
      },
    });

    // 未購入の場合
    if (!existingPurchase) {
      // 購入情報を作成
      const purchase = await prisma.purchase.create({
        data: {
          userId: session.client_reference_id!,
          bookId: session.metadata?.bookId!,
        },
      });
      return NextResponse.json({ purchase });
    }
    // 既に購入済みの場合
    else {
      return NextResponse.json({ message: "既に購入済みです。" });
    }
  } catch (error: any) {
    return NextResponse.json(error);
  }
}
