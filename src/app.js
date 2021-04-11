const express = require('express')
const app = express();
const morgan = require('morgan');
const { performCheck } = require('./check');
require('dotenv').config();

app.use(express.json());
if (process.env.ENV == 'dev') app.use(morgan('dev'));

app.get('/api/performCheck', async (req, res) => {
    //performCheck(id, query, type)

    if (!req.query.id || !req.query.query || !req.query.type) {
        console.log(req.query);
        res.status(400).json({
            message: 'Invalid query parameters.'
        });
        return;
    }
    const { id, query, type } = req.query;

    console.log(`Performing check with ID: ${id} Query: ${query} and Type: ${query}`);
    res.status(200).json(await performCheck(id, query, type));
    return;
    res.status(200).json({
        message: 'Hello!'
    });
});




app.listen(process.env.PORT, () => { console.log(`Server started on: ${process.env.URL}:${process.env.PORT}/`); })