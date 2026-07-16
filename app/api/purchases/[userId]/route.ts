import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// 購入履歴検索API
export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  // userIdを取得
  const { userId } = await params;

  try {
    // 購入履歴を取得
    const purchases = await prisma.purchase.findMany({
      where: { userId: userId },
    });

    return NextResponse.json(purchases);
  } catch (error) {
    return NextResponse.json(error);
  }
}
