import React, { useState } from 'react'
import { Fragment } from 'react';
import ListNotice from './listNotice';
import './inputNotice.css';




const InputNotice = () => {

const [headline, setHeadline] = useState("");
const [note, setNote] = useState("");


const inputNotes = async(e) =>{
  try {
    const body = {headline, note}
    console.log("test",body)
    const response = await fetch("http://localhost:5000/notices",{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify(body)
                
            });
            console.log(response);
  } catch (error) {
    console.error(error.message)
  }
}

  return (
   <Fragment>
     <div className='container'>
      <div className='row h-100 justify-content-center align-items-center '>
            
              <form onSubmit={inputNotes}>
              <fieldset >
                <label for="fname">Add a headline here:</label><br/>
                <input type={"text"} value={headline} onChange={e=>setHeadline(e.target.value)} /><br/><br/>
                <label for="fname">Add a note here:</label><br/>
                <input type={"text"} value={note} onChange={e=>setNote(e.target.value)} /><br/><br/>
                <button className='btn btn-primary'>Add</button>
                </fieldset>
              </form>
              
        </div>  
        <hr/>
        <div>
          
            <ListNotice/>
            
        </div>

     </div>
   </Fragment>
  )
}

export default InputNotice;