import React, { useEffect, useState } from "react";
import axios from 'axios'
import {Link} from "react-router-dom"

const Books =()=>{
  const [books,setBooks]=useState([]);

  useEffect(()=>{
    const fetchBooks = async function () {
       try{
           const response=await axios.get("http://localhost:8800/books")
           console.log(response.data)
           setBooks(response.data)
       }catch(err){
         console.log(err)
       }
    }
    fetchBooks()
    
  },[])

 async function handleDelete (id){
    console.log("dElete id",id)
    try{
      await axios.delete("http://localhost:8800/books/"+id)
      window.location.reload()
    }catch(err){
      console.log(err)
    }
 }

  return(
    <>
    <div>

    <div className="books">
      { books.map((e)=>(
            <div className="book" key={e.id}>
         {e.cover ? <img src={e.cover} alt="Cover Image" /> : <p>No cover image available</p>}  
              <div>Title : {e?.title}</div>
              <div>Description : {e?.desc}</div>
              <div>Description : {e?.cover}</div>
              <span>{e?.price}</span>
              <button className="delete" onClick={()=>{handleDelete(e.id)}}>Delete</button>
              <button className="update">Update</button>
            </div>
      )
      )}
    </div>

    <div>
    <button><Link to="/add">Add new books</Link></button>
    </div>
    </div>
    </>
  )
}

export default Books;