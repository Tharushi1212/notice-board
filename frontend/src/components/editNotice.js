import React, { Fragment, useState } from 'react';

const EditNotice = ({ notice }) => {
    const [headline, setHeadline] = useState(notice.headline);
    const [description, setDescription] = useState(notice.description);

    const updateNotice = async (e) => {
        e.preventDefault();
        try {
            const body = { headline, description };
            const response = await fetch(
                `http://localhost:5000/notices/${notice.notice_id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                }
            );

            window.location = '/';
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <button
                className="btn btn-warning mr-2"
                data-toggle="modal"
                data-target={`#id${notice.notice_id}`}
            >
                Edit
            </button>
        </>
    );
};

export default EditNotice;
