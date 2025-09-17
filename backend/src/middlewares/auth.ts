import { verify } from 'hono/jwt'
import { Context, Next } from 'hono'

export const authMiddleware = async (c:Context,next:Next) => {
  const authHeader = c.req.header('Authorization') || ''
  if (!authHeader) {
    return c.json({ message: 'you are not logged in' }, 401)
  }

  const token = authHeader.split(' ')[1]
  if (!token) return c.json({ message: 'you are not logged in' }, 401)

  try {
    const payload = await verify(token, c.env.JWT_SECRET) as { id: string }
    c.set('userId', payload.id)
    await next()
  } catch {
    return c.json({ message: 'you are not logged in' }, 401)
  }
}
