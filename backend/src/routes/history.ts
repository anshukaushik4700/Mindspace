import { Hono } from 'hono'
import { authMiddleware } from '../middlewares/auth'
import { getPrisma } from '../lib/db'
import { corsHeaders } from '../utils/cors'

export const historyRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET:string
  },
  Variables: {
    userId: string
  }
}>()

historyRouter.options('*', (c) => c.json({}, { headers: corsHeaders }))

historyRouter.use("/*",authMiddleware)

historyRouter.get("/" ,async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL)

    try{
        const userId = await c.get("userId")
    
        const journals = await prisma.journalEntry.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return c.json({
            journals
        }, { headers: corsHeaders })
    }catch(e){
        c.status(500)
        return c.json({message: "something wrong happened"}, { headers: corsHeaders })
    }

})

historyRouter.patch("/:id",async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL)
    const id = await c.req.param('id')
    const body = await c.req.json()

    try {
        const { howWasYourDay, howAreYouFeeling, whatWasGoodToday } = body
        const userId = await c.get("userId")

        const journal = await prisma.journalEntry.findUnique({ where: { id } })
        if (!journal || journal.userId !== userId) {
        c.status(401)
        return c.json({ message: "Unauthorized" }, { headers: corsHeaders })
        }
        if(
        !body.howWasYourDay?.trim() &&
        !body.howAreYouFeeling?.trim() &&
        !body.whatWasGoodToday?.trim()
        )
      {
        c.status(400)
        return c.json({message : "Please fill at least one field before submitting your journal."}, { headers: corsHeaders })
      }

        const updateData: any = {}
        if (howWasYourDay?.trim()) updateData.howWasYourDay = howWasYourDay.trim()
        if (howAreYouFeeling?.trim()) updateData.howAreYouFeeling = howAreYouFeeling.trim()
        if (whatWasGoodToday?.trim()) updateData.whatWasGoodToday = whatWasGoodToday.trim()


      const updatedjournal = await prisma.journalEntry.update({
            where: { id },
            data: updateData
            })
        

        return c.json({
            updatedjournal
        }, { headers: corsHeaders })


    } catch (e) {
        c.status(500)
        return c.json({message : "something wrong happened"}, { headers: corsHeaders })
    }
})

historyRouter.delete("/:id" ,async (c) => {
        const prisma = getPrisma(c.env.DATABASE_URL)
        const id = await c.req.param("id")

        try {
            const userId = await c.get('userId')
            const journal = await prisma.journalEntry.findUnique({ where: { id } })

            if(!journal || journal.userId !== userId){
                c.status(401)
                return c.json({
                    message : "unauthorized"
                }, { headers: corsHeaders })
            }

             await prisma.journalEntry.delete({ where: {id} })
            return c.json({ message : "journal deleted successfully"}, { headers: corsHeaders })
        } catch (e) {
            c.status(500)
            return c.json({message: "something went wrong"}, { headers: corsHeaders })
        }
})