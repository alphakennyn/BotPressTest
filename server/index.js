const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// require('dotenv').config({path: '../.env'});

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/hi', (req, res) => res.json({nice: 123}));

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});