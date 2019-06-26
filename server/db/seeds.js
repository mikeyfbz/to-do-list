use toDoList

db.toDo.insertMany([
    {
        name: "Learn French", 
        desc: "Learn to speak french",
        due: "2019/6/30"
    },
    {
        name: "Sail a boat", 
        desc: "Sail a boat from Scotland to France",
        due: "2019/6/30"
    }
])