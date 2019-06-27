const GridView = require('./grid_view.js');
const PubSub = require('../helpers/pub_sub.js');

const TileView = function(element, completedElement){
    this.element = element;
    this.completedElement = completedElement;
}

TileView.prototype.render = function(tile, index){
    if(tile.completed == false){
        const newTile = document.createElement('div');
        newTile.classList.add('tile');
        newTile.id = `tile${tile._id}`;

        const titleLable = document.createElement('label');
        titleLable.textContent = "Title: ";
        const title = document.createElement('h3');
        title.textContent = tile.title;
        newTile.appendChild(titleLable);
        newTile.appendChild(title);

        const dateLabel = document.createElement('label');
        dateLabel.textContent = "Date: ";
        const date = document.createElement('h3');
        date.textContent = tile.due_date;
        newTile.appendChild(dateLabel);
        newTile.appendChild(date);

        const descLabel = document.createElement('label');
        descLabel.textContent = "Description: ";
        const desc = document.createElement('h3');
        desc.textContent = tile.desc;
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
        buttons.appendChild(completedButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.id = `deleteButton${index}`;
        deleteButton.value = tile._id;
        buttons.appendChild(deleteButton);

        this.element.appendChild(newTile);

        deleteButton.addEventListener('click', (event)=> {
            const click = event.target.value;
            PubSub.publish('TileView:delete-tile', click)
        })
        
        completedButton.addEventListener('click', (event)=>{
            const click = event;
            PubSub.publish('TileView:tile-complete', click);
        })
    } else {
        const newTile = document.createElement('div');
        newTile.classList.add('tile');
        newTile.id = `tile${tile._id}`;

        const titleLable = document.createElement('label');
        titleLable.textContent = "Title: ";
        const title = document.createElement('h3');
        title.textContent = tile.title;
        newTile.appendChild(titleLable);
        newTile.appendChild(title);

        const dateLabel = document.createElement('label');
        dateLabel.textContent = "Date: ";
        const date = document.createElement('h3');
        date.textContent = tile.due_date;
        newTile.appendChild(dateLabel);
        newTile.appendChild(date);

        const descLabel = document.createElement('label');
        descLabel.textContent = "Description: ";
        const desc = document.createElement('h3');
        desc.textContent = tile.desc;
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
        buttons.appendChild(completedButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.id = `deleteButton${index}`;
        deleteButton.value = tile._id;
        buttons.appendChild(deleteButton);

        this.completedElement.appendChild(newTile);

        deleteButton.addEventListener('click', (event)=> {
            const click = event.target.value;
            PubSub.publish('TileView:delete-tile', click)
        })
        
        completedButton.addEventListener('click', (event)=>{
            const click = event;
            PubSub.publish('TileView:tile-complete', click);
        })

    }
}



module.exports = TileView;