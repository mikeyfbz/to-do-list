const PubSub = require('../helpers/pub_sub.js');
const TileView = require('./tile_view.js');

const GridView = function(element, completedElement){
    this.element = element;
    this.completedElement = completedElement;
}

GridView.prototype.bindEvents = function(){
    PubSub.subscribe('ToDo:allData', (event) => {
        const formDetails = event.detail;
        this.populate(formDetails);
    })
}

GridView.prototype.populate = function(formDetails){
    this.element.innerHTML = '';
    this.completedElement.innerHTML = '';
    formDetails.forEach((tile, index) => {
        const popTile = new TileView(this.element, this.completedElement);
        popTile.render(tile, index)
    })
}

module.exports = GridView;  