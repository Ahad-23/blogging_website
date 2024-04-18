import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign,verify } from 'hono/jwt'
export const blogRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string;
      JWT_SECRET:string
    }
    }>()

    
blogRouter.post('/', (c) => c.text('POST /'))

blogRouter.put('/', (c) => c.text('POST /'))

blogRouter.get('/', (c) => {
  return c.text('Hello Hono!')
})

blogRouter.get('/bulk', (c) => c.text('PUT /'))