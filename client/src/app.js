const FormView = require('./views/form_view.js');

document.addEventListener('DOMContentLoaded', function(){

    const form = document.querySelector('#new_task_form');
    const formView = new FormView(form);
    formView.bindEvents();

})