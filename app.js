// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
document.getElementById('userActionButton').addEventListener('click', showInputDialog); // Input field
todoList.addEventListener("click", deleteCheck);
todoList.addEventListener("click", handleTodoActions); // to add after edit functionality
filterOption.addEventListener('click', filterTodo);


// new 2

// Additional event listener for updating user name
document.getElementById('userNameInput').addEventListener('input', updateUserName);

// Update UI according to local storage
function getTodos() {
  // Check if it's there - todo
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = []; // Do we have anything in local storage? If not, null.
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); // If so, get it back
  }
  todos.forEach(function (todo) {
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Check Mark Button - completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa-solid fa-square-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // Append to list
    todoList.appendChild(todoDiv);
  });
}

// Function to show input dialog
function showInputDialog() {
  const userInput = window.prompt("Enter your name:");

  if (userInput !== null) {
    // If user clicks "OK" and doesn't cancel
    updateUserName(userInput);
  }
}

// Function to update user name
function updateUserName(userName) {
  const todoListTitle = document.getElementById('todoListTitle');

  // Check if the input is not empty, then update the title
  if (userName.trim() !== '') {
    todoListTitle.innerText = `${userName}'s Todo List`;
  } else {
    // If the input is empty, revert to default title
    todoListTitle.innerText = 'Popsy Todo List';
  }
}

// new 2 ends

// Functions
function addTodo(event){
  // Prevent Form from submitting
  event.preventDefault();
  // Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;  // add the input
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // Add TODO to local storage - added before clearing todo input value
  saveLocalTodos(todoInput.value);
  // Check Mark Button - completed button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fa-solid fa-square-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  // Trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  // Append to list
  todoList.appendChild(todoDiv);
  // Clear todo input value
  todoInput.value = "";
}

// Create delete check

function deleteCheck(e) {
  // console.log(e.target);  // testing it works
  const item = e.target;
   // Delete todo
   if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Fall Animation
    todo.classList.add('fall'); // fall animation
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function(){
      // execute after animation ends
      todo.remove();
    });
   }

   // Check Mark
   if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
   };
}


// FILTER
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch(e.target.value){
      case "all":
        todo.style.display = "flex";
        break;
        case "completed":
          if(todo.classList.contains('completed')) {
            todo.style.display = 'flex';
          } else{
            todo.style.display = 'none';
          }
          break; // Helps seperate completed from uncompleted
          case "uncompleted":
            if(!todo.classList.contains('completed')) {
              todo.style.display = 'flex';
            } else{
              todo.style.display = 'none';
            } 
            break;
    }
  });
}


// Save to local todos

function saveLocalTodos(todo){
  // check if it's there - todo
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Update UI accoring to local storage

function getTodos(){
  // console.log('hello'); // testing if it worked
  // check if it's there - todo
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = []; // do we have anything in local storage? If not, null.
  } else{
    todos = JSON.parse(localStorage.getItem("todos")); // if so, get it back
  }
  todos.forEach(function(todo){
    // Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todo;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // Check Mark Button - completed button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fa-solid fa-square-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  // Trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  // Append to list
  todoList.appendChild(todoDiv);
  })
}


// Remove todos from local storage

function removeLocalTodos(todo){
   // check if it's there - todo
   let todos;
   if(localStorage.getItem('todos') === null){
     todos = []; // do we have anything in local storage? If not, null.
   } else{
     todos = JSON.parse(localStorage.getItem("todos")); // if so, get it back
   }
   // Find the index of the todo with the same text content
  const todoIndex = todos.findIndex(t => t === todo.children[0].innerText);

  // Removing specific element from array with splice
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}


// new 1

// Handle actions on todo items (delete, complete, edit)
function handleTodoActions(e) {
  const item = e.target;
  
  // Delete todo
  if (item.classList.contains("trash-btn")) {
    const todo = item.parentElement;
    deleteTodo(todo);
  }

  // Check Mark
  if (item.classList.contains("complete-btn")) {
    const todo = item.parentElement;
    toggleTodoCompletion(todo);
  }

  // Edit todo
  if (item.classList.contains("todo-item")) {
    const todo = item.parentElement;
    editTodo(todo);
  }
}

// Edit todo
function editTodo(todo) {
  const currentText = todo.querySelector(".todo-item").innerText;
  const editText = prompt("Edit todo:", currentText);

  if (editText !== null) {
    todo.querySelector(".todo-item").innerText = editText;
    updateLocalTodos();
  }
}

// Update local storage after editing todo
function updateLocalTodos() {
  const todos = Array.from(todoList.children).map(todo => todo.querySelector(".todo-item").innerText);
  localStorage.setItem("todos", JSON.stringify(todos));
}
