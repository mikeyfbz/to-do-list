use toDoList

db.toDo.insertMany([
    {
        title: "Learn French", 
        desc: "Learn to speak french",
        due: "2019-06-30",
        completed: false, 
        importance: "High"
    },
    {
        title: "Sail a boat", 
        desc: "Sail a boat from Scotland to France",
        due: "2019-06-30",
        completed: false, 
        importance: "Medium"
    }
])