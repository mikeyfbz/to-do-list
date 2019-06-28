const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const ToDo = function(url){
    this.url = url;
    this.request = new RequestHelper(this.url);
    this.tiles = [];
}

ToDo.prototype.bindEvents = function(){
    PubSub.subscribe('FormView:entered-details', (event) => {
        const details = event.detail;
        this.prepData(details)
        
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

ToDo.prototype.prepData = function(details){
    const object = [{
        title: details.title.value,
        desc: details.desc.value,
        due_date: details.due_date.value,
        completed: false,
        importance: details.importance.value
    }];
    this.request.post(object)
        .then((allData) => {
            PubSub.publish('ToDo:allData', allData)
        })
}

ToDo.prototype.getData = function(){
    this.request.get()
        .then((allData) => {
            this.tiles = allData;
            PubSub.publish('ToDo:allData', allData);
        })
}

ToDo.prototype.deleteTile = function(id){
    this.request.delete(id)
        .then((allData)=> {
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
    const object = {
        title: completedTile.title,
        desc: completedTile.desc,
        due_date: completedTile.due_date,
        completed: true,
        importance: completedTile.importance
    };
    this.request.put(id, object)
        .then((allData) => {
            PubSub.publish('ToDo:allData', allData)
        })
}

module.exports = ToDo;