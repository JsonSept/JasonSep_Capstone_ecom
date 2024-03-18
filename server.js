import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mysql2 from 'mysql2'
import cookieParser from 'cookie-parser'
import {config} from 'dotenv'
import productsRouter from './routes/products.js'
import usersRouter from './routes/users.js'
config()

const PORT = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())


const authenticate = (req,res,next) =>{
    let {cookie} = req.headers
    let tokenInHeader = cookie && cookie.split('=')[1]
    if(tokenInHeader===null) res.sendStatus(401)
    jwt.verify(tokenInHeader,process.env.SECRET_KEY,(err,user)=>{
if(err) return res.sendStatus(403)
req.user = user
next()
})
}


app.use('/products', productsRouter)
app.use('/users',authenticate, usersRouter)

app.post('/login',(req,res)=>{
    res.send(`Hi,${req.body.email}. You have logged in`)
})

app.get('/users',authenticate, async (req,res)=>{
    res.send(await getUsers())
})

app.listen(PORT, ()  =>{
    console.log('http://localhost:'+ PORT);
})