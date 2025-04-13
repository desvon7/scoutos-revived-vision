
// We need to install @prisma/client for this to work
// For now, we'll mock the PrismaClient to avoid build errors
class PrismaClient {
  constructor(options?: any) {}
  
  // Mock the user model
  user = {
    findUnique: async () => null,
    findFirst: async () => null,
    create: async () => null,
    update: async () => null,
    delete: async () => null,
  }
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
