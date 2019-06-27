const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const ToDo = function(url){
    this.url = url;
    this.request = new RequestHelper(this.url);
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
    this.request.post(object)
        .then((allData) => {
            PubSub.publish('ToDo:allData', allData)
        })
}

ToDo.prototype.getData = function(){
    this.request.get()
        .then((allData) => {
            PubSub.publish('ToDo:allData', allData);
        })
}

module.exports = ToDo;