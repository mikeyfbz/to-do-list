

const TileView = function(element){
    this.element = element;
}

TileView.prototype.render = function(tile, index){
    console.log(tile)
    const newTile = document.createElement('div');
    newTile.classList.add('tile');

    const titleLable = document.createElement('label');
    titleLable.textContent = "Title: ";
    const title = document.createElement('h3');
    title.textContent = tile.title;
    newTile.appendChild(titleLable);
    newTile.appendChild(title);

    const dateLabel = document.createElement('label');
    dateLabel.textContent = "Date: ";
    const date = document.createElement('h3');
    date.textContent = tile.due;
    newTile.appendChild(dateLabel);
    newTile.appendChild(date);

    const descLabel = document.createElement('label');
    descLabel.textContent = "Description: ";
    const desc = document.createElement('h3');
    desc.textContent = tile.desc;
    desc.classList.add('desc');
    newTile.appendChild(descLabel);
    newTile.appendChild(desc);

    const completedButton = document.createElement('button');
    completedButton.textContent = "Completed";
    completedButton.id = 'completedButton';
    newTile.appendChild(completedButton);


    this.element.appendChild(newTile);
}



module.exports = TileView;