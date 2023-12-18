import mysql, { ConnectionOptions } from 'mysql2';
import { Request, Response } from "express";
const express = require('express')
const cors =require('cors')
const app = express()
app.use(cors())
const port = 4000
const urlBaseApi = "https://test.khsport.net:666/API/TopupV2.ashx";
const access: ConnectionOptions = {
    host:'localhost',
    user: 'root',
    database: 'microserv_db',
  };
const conn = mysql.createConnection(access);

app.get('/agent', (req:Request, res:Response) => {

  res.send(req)
 
})

app.get('/users/:id', (req:Request, res:Response) => {
  // res.send({id:req.params.id})
  conn.query('SELECT * FROM users_ WHERE id = ?', req.params.id,(_err, rows)=>{
    res.send(rows)
  })
})

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// https://youtu.be/KsHFxfBWVDw?si=WEiBdHI5dlyTmMdh