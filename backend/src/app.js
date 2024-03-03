import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

import router from "./routes/user.routes.js"

//routes declarations
app.use("/api/users", router)

export default app;