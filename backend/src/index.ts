import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign } from 'hono/jwt'
const app = new Hono()

app.post('/api/v1/signup', async (c) => {
	const prisma = new PrismaClient({
    //@ts-ignore
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
    //@ts-ignore
		const token = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ 
      jwt:token 
    });
	} 
  catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})

app.post('/api/v1/user/signin', (c) => c.text('signin route'))

app.post('/api/v1/blog', (c) => c.text('POST /'))

app.put('/api/v1/blog', (c) => c.text('POST /'))

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/bulk', (c) => c.text('PUT /'))


export default app

