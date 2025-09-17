import { Hono } from 'hono'
import { authMiddleware } from '../middlewares/auth'
import { getPrisma } from '../lib/db'

export const journalRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET:string
  },
  Variables: {
    userId: string
  }
}>()

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
}

journalRouter.options('*', (c) => c.json({}, { headers: corsHeaders }))
journalRouter.use("/*", async (c, next) => {
  c.header("Access-Control-Allow-Origin", "*")
  c.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
  await next()
})

journalRouter.use("/*",authMiddleware)


journalRouter.post('/' ,async (c) => {
      const body = await c.req.json()
      const prisma = getPrisma(c.env.DATABASE_URL)

      if(
        !body.howWasYourDay?.trim() &&
        !body.howAreYouFeeling?.trim() &&
        !body.whatWasGoodToday?.trim()
        )
      {
        c.status(400)
        return c.json({message : "Please fill at least one field before submitting your journal."}, { status: 400, headers: corsHeaders })
      }

      try {

        const userId = await c.get("userId")

        const journal = await prisma.journalEntry.create({
          data: {
            howWasYourDay: body.howWasYourDay?.trim() || null,
            howAreYouFeeling:body.howAreYouFeeling?.trim() || null,
            whatWasGoodToday:body.whatWasGoodToday?.trim() || null,
            user : {
              connect : {id : userId}
            }
          }
        })

        return c.json({
          id: journal.id,
          journal
        }, { headers: corsHeaders })

      } catch (e) {
        console.error(e)
        c.status(500)
        return c.json({message : "soemthing wrong happened"}, { status: 500, headers: corsHeaders })
      }
})


