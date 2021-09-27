let listOfItem = [];

// selectors
let createBtn = document.querySelector("#create");
let taskInput = document.querySelector("#taskName");
let taskList = document.querySelector("body > section > main > div.list");

// event listeners
createBtn.addEventListener('click', submitTaskBtnHandler);
taskInput.addEventListener('input', function(event) {
  console.log("user typing: ", event.target.value.length);
  if(event.target.value.length >= 20) {
    alert("max input val");
  }
  
  if(event.target.value.length === 0) {
    createBtn.disabled = true;
  } else {
    createBtn.disabled = false;
  }
});
document.addEventListener('keydown', function(event) {
  // on user press enter button, we create task
  if (event.keyCode === 13) {
    submitTaskBtnHandler();
  }
})

// handelers
function submitTaskBtnHandler() {
  let taskName = taskInput.value; // get task name from input field
  let generatedId = generateUniqueId(); // generate unique id for easy future manipulations

  // cheking if task name entered
  if(taskName.length !== 0) {
    addNewTask(taskName, generatedId); // add task to data structure
    
    taskList.appendChild(createTaskElement(taskName, generatedId)) // create element
    
    taskInput.value = ""; // clear input element

    createBtn.disabled = true; // disable create task button

    console.log("listOfItem: ", listOfItem);
  }
}


// helpers
function createTaskElement(name, generateId) {
  let taskItem = document.createElement('div');
  let taskCheckbox = document.createElement('input');
  let taskText = document.createElement('p');
  let taskBtns = document.createElement('div');
  let taskDeleteBtn = document.createElement('button'); 

  taskCheckbox.type = 'checkbox';
  // taskCheckbox.id = '';
  taskItem.id = generateId;

  taskText.innerHTML = name; // set task name
  taskDeleteBtn.innerHTML = "delete"; // set task name

  taskItem.classList.add('list-item'); // add styling to main task container
  taskText.classList.add('list-item-p'); // add styling to main task container

  taskItem.appendChild(taskCheckbox);
  taskItem.appendChild(taskText);
  taskItem.appendChild(taskBtns);

  taskBtns.appendChild(taskDeleteBtn);
  
  return taskItem;
}

// main functions

function addNewTask(name, id) {

  listOfItem.push({
    id: id,
    name: name,
    isCheked: 1, // ?maybe false or 0 (!item.isCheked)
    createdAt: new Date(),
    editedAt: new Date(),
  });
}

function generateUniqueId() {
  return Math.random().toString(16).slice(2);
}