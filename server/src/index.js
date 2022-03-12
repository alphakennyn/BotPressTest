const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes'); 
// require('dotenv').config({path: '../.env'});

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', routes);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});