const PubSub = require('../helpers/pub_sub.js');
const TileView = require('./tile_view.js');

const GridView = function(element){
    this.element = element;
}

GridView.prototype.bindEvents = function(){
    PubSub.subscribe('ToDo:allData', (event) => {
        const formDetails = event.detail;
        this.populate(formDetails);
    })
}

GridView.prototype.populate = function(formDetails){
    this.element.innerHTML = '';
    formDetails.forEach((tile, index) => {
        const popTile = new TileView(this.element);
        popTile.render(tile, index)
    })
}


module.exports = GridView;