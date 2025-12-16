import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from './config/db.js'

const app = express()
const port = 2000

//MiddleWare
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(clerkMiddleware())

//DB
connectDB()
//Routes 

//port

app.get('/', (req, res) => {
   res.send("API funcionando")
})

app.listen(port, () => {
  console.log('Rodando no servidor http://localhost:2000/')
})