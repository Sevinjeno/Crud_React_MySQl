import express from "express";
import mysql from "mysql2"
import cors from "cors"

const app=express();
const port=8800;

app.use(express.json())

app.use(cors())

//db connection

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Manchesterutd7",
    database:"test"
})

//creating api
app.get("/",(req,res)=>{
    res.json("Hello from the backend!")
})

//from db to get all data from books table
app.get("/books",(req,res)=>{
    const q="SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

//inserting data into database 

app.post("/books",(req,res)=>{
    const q = "Insert INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)"
    const values=[
       req.body.title,
       req.body.desc,
       req.body.price,
       req.body.cover,
    ]

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);    
        })
})

app.listen(port,()=>{
    console.log(`App is running on port ${port}`)
})

app.delete("/books/:id",(req,res)=>{
    console.log("delete")
    const bookId=req.params.id;console.log(bookId)
    const q="DELETE FROM books WHERE id = ?"

    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err)
            return res.json("Book has been deleted Successfully ")
    })
})

app.put("/books/:id",(req,res)=>{
    console.log("delete")
    const bookId=req.params.id;console.log(bookId)
    const q="UPDATE books SET `title`=?,`desc`=?,`price`=? ,`cover`=? WHERE id =? ";
    
    const values=[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
     ]
    

    db.query(q,[...values,bookId],(err,data)=>{
        if(err) return res.json(err)
            return res.json("Book has been Updated Successfully ")
    })
})