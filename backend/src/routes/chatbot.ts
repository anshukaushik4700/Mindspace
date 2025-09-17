import { Hono } from 'hono'
import { authMiddleware } from '../middlewares/auth'
import { corsHeaders } from '../utils/cors'

export const chatRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
    GEMINI_API_KEY: string
  },
  Variables: {
    userId: string
  }
}>()

chatRouter.options('*', (c) => c.json({}, { headers: corsHeaders }))

chatRouter.use("/*", authMiddleware)

chatRouter.post("/", async (c) => {
  try {
    const apiKey = c.env.GEMINI_API_KEY
    if (!apiKey) {
      return c.json({ error: "Missing GEMINI_API_KEY" }, 500)
    }

    const { message } = await c.req.json<{ message: string }>()

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`

    const body = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a compassionate and humble mental health support chatbot. 
                        Always reply in a respectful, warm, and encouraging way. 
                        Do not use nicknames like 'honey', 'dear', or anything romantic. 
                        Focus on emotional support, active listening, and practical mental health tips,
                        and talk like therapist friend and do not 5 to 8 lines ,
                        simply dont write essays or long explainations 

                        The user says: "${message}"`
            }
          ]
        }
      ],
      generationConfig: { temperature: 0.7 }
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      const errorText = await res.text()
      return c.json({ error: "Gemini API request failed", details: errorText }, { headers: corsHeaders })
    }

    const data = await res.json()

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a reply."

    return c.json({ reply }, { headers: corsHeaders })
  } catch (err: any) {
    return c.json({ error: err.message }, { status: 500, headers: corsHeaders })
  }
})
