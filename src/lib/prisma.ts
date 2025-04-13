
// We need to install @prisma/client for this to work
// For now, we'll mock the PrismaClient to avoid build errors
class PrismaClient {
  constructor(options?: any) {}
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma 
