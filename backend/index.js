import express from "express";
import req from './routes/reqRoute.js'
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))

app.use('/api/v1/',req)

export default app;