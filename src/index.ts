import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { paperRouter } from './routes/paper'



//just typescript thing
const app = new Hono(); 

app.route("/api/v1/user", userRouter);
app.route("api/v1/paper", paperRouter);

export default app
