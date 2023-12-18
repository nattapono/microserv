import mysql, { ConnectionOptions } from 'mysql2';
import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken';
const cors =require('cors')
const app = express()
app.use(cors())
const port = 4000

const access: ConnectionOptions = {
    host:'localhost',
    user: 'root',
    database: 'omgcom_microserv_db'
    // user: 'omgcom',
    // password:'xG8spQ(6OP60p*',

  };
const conn = mysql.createConnection(access);

app.get('/agent', (req:Request, res:Response) => {
  // ใช้ res.redirect เพื่อทำการ redirect

    res.send().redirect('./agent');


});
app.use(express.json()); // เพื่อให้ Express สามารถอ่าน req.body ได้

app.post('/login', (req: Request, res: Response) => {
  conn.query('SELECT * FROM users_ WHERE username = ? and password = ?', [req.body.username, req.body.password], (_err, rows) => {
    if (rows) {
      // ถ้าพบ user ที่ตรงกัน
      const token = jwt.sign({username:String }, 'secretKey', { expiresIn: '1h' });
      const data = {
        code: "0000",
        msg: "success",
        token
      };
      res.json(data);
    } else {
      // ถ้าไม่พบ user ที่ตรงกัน
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
})

app.get('/users', (req:Request, res:Response) => {
  conn.query('SELECT * FROM users_',(_err, rows)=>{
    res.send(rows)
  })
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