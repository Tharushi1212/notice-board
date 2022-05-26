const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
//to get json data from body
app.use(express.json());

//ROUTES

//create a notice
app.post('/notices', async (req, res) => {
    try {
        const { headline, note } = req.body;
        //console.log(headline, note)
        await pool.query(
            'INSERT INTO notice (headline,description) VALUES($1,$2) RETURNING *',
            [headline, note]
        );
        //console.log(newNotice.rows[0])
        // res.json(newNotice.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all notices

app.get('/notices', async (req, res) => {
    try {
        const allNotices = await pool.query('SELECT * FROM notice');
        console.log(allNotices.rows[0]);
        res.json(allNotices.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//delete a notice
app.delete('/notices/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log();
        const deleteNotice = await pool.query(
            'DELETE FROM notice WHERE notice_id = $1',
            [id]
        );
        console.log(deleteNotice);
        res.json('Todo was deleted!');
    } catch (err) {
        console.log(err.message);
    }
});

//update a notice
app.put('/notices/:id', async (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    try {
        const { id } = req.params;
        const { headline, description } = req.body;
        const updateNotice = await pool.query(
            'UPDATE notice SET description = $1 , headline = $2 WHERE notice_id = $3',
            [description, headline, id]
        );

        res.json('Todo was updated!');
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log('server started on port 5000 .');
});
