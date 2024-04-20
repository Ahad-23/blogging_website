import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign,verify } from 'hono/jwt'
import { signupInput,signinInput } from '@ahad_shaikh/medium_project_common'

export const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL:string;
    JWT_SECRET:string
  }
  }>()

userRouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const{success}=signupInput.safeParse(body);
	if(!success)
		{
			c.status(411)
			return c.json({
				message:"Inputs not correct"
			})
		}
	try {
		const user = await prisma.user.create({
			data: {
		username: body.username,
        password: body.password,
        email: body.email,
        name: body.name
			}
		});
		const token = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ 
      jwt:token 
    });
	} 
  catch(e) {
		c.status(411);
		return c.json({ error: "error while signing up" });
	}
})


userRouter.post('/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const{success}=signinInput.safeParse(body);
	if(!success)
		{
			c.status(411)
			return c.json({
				message:"Inputs not correct"
			})
		}
	try {
		const user = await prisma.user.findFirst({
			where: {
				username: body.username,
        password: body.password,
			}
		});
		if(!user)
      {
        c.status(403);
        return c.json({
          "message":"Incorrect credentials"
        })
      }
      const jwt=await sign({
        id:user.id},c.env.JWT_SECRET)
      return c.text(jwt)
	} 
  catch(e) {
    console.log(e)
		c.status(411);
		return c.json({ error: "error while logging in" });
	}
})