const express = require('express');
const app = express();
const MongoClient = require('mongo').MongoClient;
const path = require('path');
const createRouter = require('./helpers/create_router.js');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

MongoClient.connect('mongo://localhost:27017')
    .then((client) => {
        const db = client.db('todoList');
        const toDoCollection = db.collection('toDo');
        const toDoRouter = createRouter(toDoCollection);
        app.use('/api/toDo', toDoRouter);
    })
    .catch(console.error);

app.listen(3000, function(){
    console.log(`App listening on ${this.address().port}`)
});