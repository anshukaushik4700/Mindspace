import { Hono } from 'hono'
import {userRouter} from './routes/user'
import { journalRouter } from './routes/journals'
import { historyRouter } from './routes/history'
import { chatRouter } from './routes/chatbot'
import { moodRouter } from './routes/mood'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,

  }
}>()


app.route('/user',userRouter)
app.route('/journals',journalRouter)
app.route('/history',historyRouter)
app.route('/chat',chatRouter)
app.route('/mood',moodRouter)


export default app