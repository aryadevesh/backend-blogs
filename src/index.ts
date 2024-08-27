import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { paperRouter } from './routes/paper'

import { cors } from 'hono/cors';

//just typescript thing
const app = new Hono(); 
app.use('/*', cors());
app.route("/api/v1/user", userRouter);
app.route("api/v1/paper", paperRouter);

export default app
