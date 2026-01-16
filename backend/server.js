import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from './config/db.js'
import cursoRouter from './routes/cursoRoute.js'

const app = express()
const port = 2000

//MiddleWare
app.use(cors({
  origin:["http://localhost:5173" ,"http://localhost:5174"],
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(clerkMiddleware())
app.use('/uploads', express.static('uploads'))

//DB
connectDB()

//Routes 
app.use('/api/curso', cursoRouter)

//port
app.get('/', (req, res) => {
   res.send("API funcionando")
})

app.listen(port, () => {
  console.log('Rodando no servidor http://localhost:2000/')
})