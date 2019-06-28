const GridView = require('./grid_view.js');
const PubSub = require('../helpers/pub_sub.js');

const TileView = function(element, completedElement){
    this.element = element;
    this.completedElement = completedElement;
}

TileView.prototype.render = function(tile, index){
    if(tile.completed == false){
        this.populateTile(tile, index, this.element)
        
    } else {
        this.populateTile(tile, index, this.completedElement)

    }
}

TileView.prototype.populateTile = function(tile, index, element){
    const newTile = document.createElement('div');
        newTile.classList.add('tile');
        newTile.id = `tile${tile._id}`;

        const titleLable = this.createLabel("Title: ")
        const title = this.createContent(tile.title);
        newTile.appendChild(titleLable);
        newTile.appendChild(title);

        const dateLabel = this.createLabel("Date: ")
        const date = this.createContent(tile.due_date);
        newTile.appendChild(dateLabel);
        newTile.appendChild(date);

        const descLabel = this.createLabel("Description: ");
        const desc = this.createContent(tile.desc);
        desc.classList.add('desc');
        newTile.appendChild(descLabel);
        newTile.appendChild(desc);

        const buttons = document.createElement('div');
        buttons.classList.add('buttons');
        newTile.appendChild(buttons);

        const completedButton = document.createElement('button');
        completedButton.textContent = "Completed";
        completedButton.id = `completedButton${index}`;
        completedButton.value = tile._id;
        if(tile.completed == true){
            completedButton.classList.add('hide');
        }
        buttons.appendChild(completedButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.id = `deleteButton${index}`;
        deleteButton.value = tile._id;
        buttons.appendChild(deleteButton);

        element.appendChild(newTile);

        deleteButton.addEventListener('click', (event)=> {
            const click = event.target.value;
            PubSub.publish('TileView:delete-tile', click)
        })
        
        completedButton.addEventListener('click', (event)=>{
            const click = event;
            PubSub.publish('TileView:tile-complete', click);
        })
}

TileView.prototype.createLabel= function(labelContent){
    const label = document.createElement('label');
    label.textContent = labelContent;
    return label;
}

TileView.prototype.createContent = function(content){
    const item = document.createElement('h3');
    item.textContent = content;
    return item;
}

module.exports = TileView;