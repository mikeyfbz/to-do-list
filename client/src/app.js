const FormView = require('./views/form_view.js');
const ToDo = require('./models/to_do.js');
const GridView = require('./views/grid_view.js');

document.addEventListener('DOMContentLoaded', function(){

    let today = new Date().toISOString().substr(0, 10);
    document.querySelector("#due_date").value = today;

    const completedList = document.querySelector('#completed')
    const toDoList = document.querySelector('#to_do_list');
    const gridView = new GridView(toDoList, completedList);
    gridView.bindEvents();
    
    const form = document.querySelector('#new_task_form');
    const formView = new FormView(form);
    formView.bindEvents();
    
    const url = 'http://localhost:3000/api/toDo'
    const toDo = new ToDo(url);
    toDo.bindEvents();
    toDo.getData();
})