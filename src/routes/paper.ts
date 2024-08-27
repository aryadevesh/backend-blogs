
import { createBlogInput, updateBlogInput } from "@devesharya/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const paperRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string; 
      JWT_SECRET: string;
    }
    Variables: {
        userId: string;
    }
  }>();

paperRouter.use("/*", async (c, next) => {
    try {
        const authHeader = c.req.header("authorization") || "";
        console.log(authHeader);
        // Verify the JWT token
        const user = await verify(authHeader, c.env.JWT_SECRET);
        
        // Ensure user is an object and has an id property of type string
        if (user) {
            c.set("userId", String(user.id));
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "Please login again"
            });
        }
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        c.status(403);
        return c.json({
            message: "Authentication failed. Please login again."
        });
    }
});

paperRouter.post('/',async (c) => {
    const body = await c.req.json();
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const { success } = createBlogInput.safeParse(body);

      if(!success){
        c.status(411);
        return c.json({
          message: "Incorrect inputs",
        })
      }
    const paper = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    })

    return c.json({
        id: paper.id,
    });

  })
  
paperRouter.put('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const { success } = updateBlogInput.safeParse(body);

      if(!success){
        c.status(411);
        return c.json({
          message: "Incorrect inputs",
        })
      }
    const paper = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }

    })
    return c.json({
        id: paper.id,
    });
})
// implement pagination for all the blogs
paperRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const papers = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });
   
    return c.json({
        papers
    });
})    
  

paperRouter.get('/:id', async(c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const paper = await prisma.post.findUnique({
        where: {
            id : Number(id),
        },
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true
                }
            }
        }

    })
    return c.json({
        paper
    });
})

