import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign,verify,} from 'hono/jwt'
import { createblogInput,updateblogInput } from '@ahad_shaikh/medium_project_common'
export const blogRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string;
      JWT_SECRET:string;
    },
    Variables:
    {
        userId:string
    }
    }>()

blogRouter.use("/*",async (c,next)=>{
    const authHeader=c.req.header("Authorization")|| ""
   try{
    const user=await verify(authHeader,c.env.JWT_SECRET)
    if(user)
        {
        c.set("userId",user.id)
    await next();
        }
        else{
            c.status(403)
            return c.json({
                "message":"you are not logged in"
            })
        }
   }catch(e)
   {
    c.status(403)
    return c.json({
        "message":"you are not logged in"
   })}
})
blogRouter.post('/',async (c) => {
    const body=await c.req.json();
    const{success}=createblogInput.safeParse(body);
	if(!success)
		{
			c.status(411)
			return c.json({
				message:"Inputs not correct"
			})
		}
    const authorId=c.get("userId")
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

    
    const blog=await prisma.blog.create(
        {
            data:{
                title: body.title,
                content: body.title,
                authorId:Number(authorId)
            }
        }
    )

    return c.json({
        id:blog.id
    })
})

blogRouter.put('/', async (c) => {
    const body=await c.req.json();
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

    const{success}=updateblogInput.safeParse(body);
	if(!success)
		{
			c.status(411)
			return c.json({
				message:"Inputs not correct"
			})
		}
    const blog=await prisma.blog.update(
        
        {
            where:
            {
                id:body.id
            },
            data:{
                title: body.title,
                content: body.content,
            }
        }
    )

    return c.json({
        id:blog.id
    })
})

blogRouter.get('/bulk',async (c) =>
    {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL	,
        }).$extends(withAccelerate());
    
        const blogs= await prisma.blog.findMany();
        return c.json({
            blogs
        })
    })


blogRouter.get('/:id', async (c) => {
    const id= c.req.param("id");
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

    try{
    const blog=await prisma.blog.findFirst(
        
        {
            where:
            {
                id:Number(id)
            }
        }
    )

    return c.json({
        blog
    })
}
catch(e)
{
    c.status(411)
    return c.json({
        "message":"Error while fetching the blog"
    })
}
})


