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
        classColour = this.addImportance(tile);
        newTile.classList.add(classColour);

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

        const completedButton = this.createButton("Completed", `completedButton${index}`, tile._id);
        if(tile.completed == true){
            completedButton.classList.add('hide');
        }
        buttons.appendChild(completedButton);

        const deleteButton = this.createButton("Delete", `deleteButton${index}`, tile._id)
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

TileView.prototype.createButton = function(content, id, value){
    const button = document.createElement('button');
    button.textContent = content;
    button.id = id;
    button.value = value;
    return button;
}

TileView.prototype.addImportance = function(tile){
    console.log(tile.importance)
    let level = '';
    if (tile.completed == true){
        level = 'done'
    }else if (tile.importance == '3'){
        level = 'high';
    } else if (tile.importance == '2'){
        level = 'medium'
    } else {
        level = 'low'
    }
    return level;
}

module.exports = TileView;