const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const ToDo = function(url){
    this.url = url;
    this.request = new RequestHelper(this.url);
    this.tiles = [];
}

ToDo.prototype.bindEvents = function(){
    PubSub.subscribe('FormView:entered-details', (event) => {
        const newDetails = event.detail;
        this.prepData(newDetails)
        
    })
    PubSub.subscribe('TileView:delete-tile', (event)=>{
        const id = event.detail;
        this.deleteTile(id);
    })
    PubSub.subscribe('TileView:tile-complete', (event)=> {
        const id = event.detail;
        this.tileCompleted(id.target.value);
    })
}

ToDo.prototype.prepData = function(newDetails){
    const newDbObject = [{
        title: newDetails.title.value.toLowerCase(),
        desc: newDetails.desc.value.toLowerCase(),
        due_date: newDetails.due_date.value,
        completed: false,
        importance: newDetails.importance.value
    }];
    this.request.post(newDbObject)
        .then((allData) => {
            allData.sort(function(object1, object2){
                return object2.importance - object1.importance
            })
            PubSub.publish('ToDo:allData', allData)
        })
}

ToDo.prototype.getData = function(){
    this.request.get()
        .then((allData) => {
            allData.sort(function(object1, object2){
                return object2.importance - object1.importance
            })
            this.tiles = allData;
            PubSub.publish('ToDo:allData', allData);
        })
}

ToDo.prototype.deleteTile = function(id){
    this.request.delete(id)
        .then((allData)=> {
            allData.sort(function(object1, object2){
                return object2.importance - object1.importance
            })
            PubSub.publish('ToDo:allData', allData);
        })
}

ToDo.prototype.tileCompleted = function(id){
    let completedTile = {}
    this.tiles.forEach((tile) => {
        if(tile._id == id){
            completedTile = tile
        }   
    })
    console.log(completedTile);
    const newDbObject = {
        title: completedTile.title,
        desc: completedTile.desc,
        due_date: completedTile.due_date,
        completed: true,
        importance: completedTile.importance
    };
    this.request.put(id, newDbObject)
        .then((allData) => {
            PubSub.publish('ToDo:allData', allData)
        })
}

module.exports = ToDo;