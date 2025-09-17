import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const getPrisma = (dbUrl: string) => {
  return new PrismaClient({
    datasourceUrl: dbUrl,
  }).$extends(withAccelerate())
}
