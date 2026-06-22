import { PrismaClient } from "@prisma/client";

// 後でPrismaClient型を入れるという宣言
let prisma: PrismaClient;

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient();
}

prisma = globalForPrisma.prisma;

export default prisma;
