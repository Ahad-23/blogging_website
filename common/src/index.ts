import z from "zod";

export const signupInput=z.object({
    username:z.string(),
        password:z.string().min(6),
        email:z.string().email(),
        name: z.string().optional()
})

export const signinInput=z.object({
    username:z.string(),
        password:z.string().min(6)
})

export const createblogInput=z.object({
    title: z.string().min(30),
                content: z.string(),
               
})

export const updateblogInput=z.object({
    title: z.string().min(30),
                content: z.string(),
                id:z.number()
})

export type signupInput=z.infer<typeof signupInput>;
export type signinInput=z.infer<typeof signinInput>;
export type createblogInput=z.infer<typeof createblogInput>;
export type updateblogInput=z.infer<typeof updateblogInput>;
