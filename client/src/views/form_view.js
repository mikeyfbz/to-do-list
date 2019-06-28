const PubSub = require('../helpers/pub_sub.js');

const FormView = function(element){
    this.element = element;
}

FormView.prototype.bindEvents = function(){
    this.element.addEventListener('submit', (event) => {
        event.preventDefault();
        const details = event.target;
        PubSub.publish('FormView:entered-details', details);
        event.target.reset();
        let today = new Date().toISOString().substr(0, 10);
        document.querySelector("#due_date").value = today;
    })
}




module.exports = FormView;