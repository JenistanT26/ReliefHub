import express from "express";
import req from './routes/reqRoute.js'
import donor from './routes/donorRoute.js'
import volunteer from './routes/volunteerRoute.js'
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))

app.use('/api/v1/',req)
app.use('/api/v1',donor)
app.use('/api/v1',volunteer)

export default app;