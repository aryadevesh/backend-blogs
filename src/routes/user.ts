import { signinInput, signupInput } from "@devesharya/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";



export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    }
  }>()

//sign-up
userRouter.post('/sign-up', async (c) => {
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
      const body = await c.req.json();
      const { success } = signupInput.safeParse(body);

      if(!success){
        c.status(411);
        return c.json({
          message: "Incorrect inputs",
        })
      }
      // Create a new user in the database
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name
        }
      })
  
      // Generate a JWT token
      const token = await sign({ id: user.id }, c.env.JWT_SECRET)
      console.log("id:" + user.id);
      // Return the token in the response
      return c.json({
        jwt: token
      })
    } catch (error) {
      // Handle any errors that occurred during the signup process
      console.error("Error during signup:", error);
  
      // Return a 500 Internal Server Error response with an error message
      return c.json({
        error: "An error occurred during signup. Please try again."
      }, 500);
    }
  });
  
  
  
  //sign-in
userRouter.post('/sign-in', async (c) => {
try {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = signinInput.safeParse(body);

      if(!success){
        c.status(411);
        return c.json({
          message: "Incorrect inputs",
        })
      }
    // Find the user with the provided email and password
    const user = await prisma.user.findUnique({
    where: {
        email : body.email,
        password: body.password
    }
    });

    // If the user is not found, return a 403 status with an error message
    if (!user) {
    c.status(403);
    return c.json({ error: "User not found/wrong password" });
    }

    // Generate a JWT token
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    // Return the JWT token in the response
    return c.json({
    jwt
    });
} catch (error) {
    // Handle any errors that occurred during the sign-in process
    console.error("Error during sign-in:", error);

    // Return a 500 Internal Server Error response with an error message
    return c.json({
    error: "An error occurred during sign-in. Please try again."
    }, 500);
}
});
  
  
  