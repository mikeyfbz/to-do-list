const PubSub = require('../helpers/pub_sub.js');

const FormView = function(element){
    this.element = element;
}

FormView.prototype.bindEvents = function(){
    this.element.addEventListener('submit', (event) => {
        event.preventDefault();
        const details = event.target;
        PubSub.publish('FormView:entered-details', details);
    })
}




module.exports = FormView;