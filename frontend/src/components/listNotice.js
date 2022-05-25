import React, { useState, useEffect } from 'react'
import Draggable from 'react-draggable';
import EditNotice from './editNotice';

const ListNotice = () => {

    const [notices, setNotices] = useState([]);

    //retrive notices
    const getNotice = async() =>{
            try {
                const fetchData = await fetch("http://localhost:5000/notices")//fetch data
                const jsonDta = await fetchData.json();//convert to json data
                setNotices(jsonDta);

            } catch (error) {
                console.error(error.message)
            }
    }
    useEffect (()=>{
        getNotice();
      },[])


    //delete notice
    const deleteNotice =async(id)=>{
        try {
            const deleteNotice = await fetch(`http://localhost:5000/notices/${id}`,{
                method:"DELETE"
            })
            console.log(deleteNotice)

            //filter out other notices
            setNotices(notices.filter(notice=>notice.notice_id !== id));
        } catch (error) {
            console.error(error.message);
        }
    }

    

  return (
    <div>
        {notices.map(note=>(
            <Draggable>
                <div className="card">
            <p key= {note.notice_id}>
                <div className='card-header'>
            {note.headline}
                </div>
                <br/>
                <div className='card-body'>
                 {note.description}
                </div>
                <br/>
                <div className='flex flex-row '>
                <EditNotice notice={notices}/>
                
                <button className='btn btn-danger ' onClick={()=>deleteNotice(note.notice_id)}>Delete</button>
                </div>
            </p>
            </div>
            </Draggable>
        ))}
    </div>
  )
}

export default ListNotice;