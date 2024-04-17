import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
const app = new Hono()

app.post('/api/v1/signup',async (c)=>
  {
    const prisma = new PrismaClient({
      //@ts-ignore
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  })

app.post('/api/v1/user/signin', (c) => c.text('signin route'))

app.post('/api/v1/blog', (c) => c.text('POST /'))

app.put('/api/v1/blog', (c) => c.text('POST /'))

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/bulk', (c) => c.text('PUT /'))


export default app

