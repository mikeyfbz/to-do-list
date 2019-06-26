const express = require('express');
const app = express();
const MongoClient = require('mongo').MongoClient;
const path = require('path');
const createRouter = require('./helpers/create_router.js');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

MongoClient.connect('mongo://localhost:27017')
    .then()


app.listen(3000, function(){
    console.log(`App listening on ${this.address().port}`)
});