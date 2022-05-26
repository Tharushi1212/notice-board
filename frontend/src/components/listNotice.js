import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import EditNotice from "./editNotice";

const ListNotice = () => {
  const [notices, setNotices] = useState([]);
  const [headline, setHeadline] = useState(notices.headline);
  const [description, setDescription] = useState(notices.description);

  //retrive notices
  const getNotice = async () => {
    try {
      const fetchData = await fetch("http://localhost:5000/notices"); //fetch data
      const jsonDta = await fetchData.json(); //convert to json data
      setNotices(jsonDta);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getNotice();
  }, []);

  //delete notice
  const deleteNotice = async (id) => {
    try {
      const deleteNotice = await fetch(`http://localhost:5000/notices/${id}`, {
        method: "DELETE",
      });
      console.log(deleteNotice);

      //filter out other notices
      setNotices(notices.filter((notice) => notice.notice_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };


  //update notice 


  const updateNotice = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/notices/${notices.notice_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
console.log(body)
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const [a, setA] = useState(false);

  const openModal = () => {};

  return (
    <div className="flex flex-row">
      {notices.map((note) => (
        <Draggable>
          <div className="card">
            <p key={note.notice_id}>
              <div className="card-header">{note.headline}</div>
              <br />
              <div className="card-body">{note.description}</div>
              <br />
              <div className="flex flex-row ">
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => setA(note.description)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger "
                  onClick={() => deleteNotice(note.notice_id)}
                >
                  Delete
                </button>
              </div>
            </p>
          </div>
        </Draggable>
      ))}

      {a && (
        <>
          <div
            className=""
            tabindex="-99"
            style={{ position: "absolute", right: "50%", top: "50%" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit notice</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <input value={a} onChange={e=>setA(e.target.value)}/>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={()=>{
                        setA(false)
                    }}
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={e=>updateNotice(e)} >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListNotice;
