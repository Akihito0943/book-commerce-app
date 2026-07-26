import Stripe from "stripe";
import { NextResponse } from "next/server";

// Stripeの初期化
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Postメソッドの定義
export async function POST(request: Request) {
  // リクエストからパラメータを取得
  const { title, price, bookId, userId } = await request.json();

  try {
    // お支払いセッションを作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // 支払方法：カード支払い
      metadata: { bookId },
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: title,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      client_reference_id: userId,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    });
    return NextResponse.json({ checkout_url: session.url });
  } catch (error: any) {
    return NextResponse.json(error.message);
  }
}
