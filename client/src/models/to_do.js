const PubSub = require('../helpers/pub_sub.js');

const ToDo = function(){

}

ToDo.prototype.bindEvents = function(){
    PubSub.subscribe('FormView:entered-details', (event) => {
        const details = event.detail;
        const newObject = this.prepData(details)
        
    })
}

ToDo.prototype.prepData = function(details){
    const object = [{
        title: details.title.value,
        desc: details.desc.value,
        due_date: details.due_date.value
    }];
    PubSub.publish('ToDo:prepared-details', object)
}


module.exports = ToDo;