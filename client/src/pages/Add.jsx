import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Add =()=>{


  const [book,setBook]=useState({
    title:"",
    desc:"",
    price:null,
    cover:"",
  })

  const navigate=useNavigate();

  const handleChange=function(e){
      setBook(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  const handleClick= async function(e){
    e.preventDefault();
    try{
       await axios.post("http://localhost:8800/books",book)
       navigate("/")
    }catch(err){
     console.log(err)
    }
    
    
}


  return(
    <>
       <h1>Add New Book</h1>
       <div>
        <input type="text" placeholder="title" name="title" onChange={handleChange} />
        <input type="text" placeholder="description" name="desc" onChange={handleChange} />
        <input type="text" placeholder="price" name="price" onChange={handleChange} />
        <input type="text" placeholder="cover" name="cover" onChange={handleChange} />
       </div>
       <button onClick={handleClick}>Add</button>
    </>
  )
}

export default Add; 