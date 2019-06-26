const PubSub = require('../helpers/pub_sub.js');
const TileView = require('./tile_view.js');

const GridView = function(element){
    this.element = element;
}

GridView.prototype.bindEvents = function(){
    PubSub.subscribe('ToDo:prepared-details', (event) => {
        const formDetails = event.detail;
        this.populate(formDetails);
    })
}

GridView.prototype.populate = function(formDetails){
    for(tile of formDetails){
    const newTile = new TileView(tile);
    this.element.appencChild(newTile);
    }
}


module.exports = GridView;