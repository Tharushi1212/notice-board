import React, { Fragment, useState } from 'react'


const EditNotice = ({notice}) => { 
const [headline, setHeadline] = useState(notice.headline);
const [description, setDescription] = useState(notice.description);

const updateNotice = async e => {
  e.preventDefault();
  try {
    const body = { headline, description };
    const response = await fetch(
      `http://localhost:5000/notices/${notice.notice_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
    );

    window.location = "/";
  } catch (err) {
    console.error(err.message);
  }
};

  return (
    <Fragment>
    <button className='btn btn-warning mr-2'data-toggle="modal" data-target={`#id${notice.notice_id}`}>Edit</button> 
    

    <div class="modal" id={`id${notice.notice_id}`}>
  <div class="modal-dialog">
    <div class="modal-content">

      
      <div class="modal-header">
        <h4 class="modal-title">Edit Notice</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

     
      <div class="modal-body">
        <input type="text" className='form-control' value={headline} onChange={e =>
        setHeadline(e.target.value)}/>

<input type="text" className='form-control' value={description} onChange={e =>
        setDescription(e.target.value)}/>
      </div>

      
      <div class="modal-footer">
        <button type="button" class="btn btn-warning" data-dismiss="modal">Edit</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={e=>updateNotice(e)}>Close</button>
      </div>

    </div>
  </div>
</div>
    </Fragment>
    
    )
}

export default EditNotice;