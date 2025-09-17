import { Hono } from 'hono'
import { authMiddleware } from '../middlewares/auth'
import { getPrisma } from '../lib/db'
import { corsHeaders } from '../utils/cors';

export const moodRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET:string
  },
  Variables: {
    userId: string
  }
}>()

moodRouter.options("/*", (c) => c.json({}, { headers: corsHeaders }));
moodRouter.use("/*",authMiddleware)

moodRouter.post("/",async (c) => {
        const prisma = getPrisma(c.env.DATABASE_URL)

        try {
            const {mood , note} = await c.req.json();
            const userId = await c.get("userId")

            if (typeof mood !== 'number' || mood < 1 || mood > 10) {
            return c.json({ error: 'Mood must be a number between 1 and 10' } , {status:400 , headers:corsHeaders})
            }

            const newMood = await prisma.moodEntry.create({
                data:{
                    mood,
                    note,
                    userId
                }
            })

            return c.json({ message: 'Mood saved successfully', data: newMood }, {headers:corsHeaders})
        } catch (e) {
            console.error(e)
            return c.json({ error: 'Something went wrong' }, {status:500 , headers:corsHeaders})
        }
})

moodRouter.get("/history" ,async (c) => {
        const prisma = getPrisma(c.env.DATABASE_URL)

        try {
          const userId = await c.get("userId")

          const moods = await prisma.moodEntry.findMany({
            where:{
              userId
            } ,
            orderBy:{
              createdAt:"desc"
            }
          })

          return c.json({
            moods
          },{headers:corsHeaders})
        } catch (e) {
          c.status(500)
          return c.json({message: "something wrong happened"},{headers:corsHeaders})
        }
})