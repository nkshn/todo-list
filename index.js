let listOfItem = [];

// selectors
let createBtn = document.querySelector('#create');
let taskInput = document.querySelector('#taskName');
let taskList = document.querySelector('body > section > main > div.list');

// event listeners
createBtn.addEventListener('click', submitTaskBtnHandler);
taskInput.addEventListener('input', function (event) {
  console.log("user typing: ", event.target.value.length);
  if (event.target.value.length >= 20) {
    alert("max input val");
  }

  if (event.target.value.length === 0) {
    createBtn.disabled = true;
  } else {
    createBtn.disabled = false;
  }
});
document.addEventListener('keydown', function (event) {
  // on user press enter button, we create task
  if (event.keyCode === 13) {
    submitTaskBtnHandler();
  }
});
taskList.addEventListener('click', function (event) {
  let gettedId = event.path[0].id;

  switch (event.path[0].classList[0]) {
    case "list-item-checkbox": // change status of task
      console.log("pressed checkBox, id: ", gettedId);
      changeStatusTaskById(gettedId); // change status item at data structure
      changeStatusTaskElement(gettedId); // change status item at data dom
      break;
    case "list-item": // mark task as done
      console.log("pressed div, id: ", gettedId);
      changeStatusTaskById(gettedId); // change status item at data structure
      changeStatusTaskElement(gettedId); // change status item at dom
      break;
    case "list-item-deleteBtn": // delete task
      console.log("pressed delete, id: ", gettedId);
      deleteTaskById(gettedId); // remove item from data structure
      deleteTaskElement(gettedId); // remove item from dom
      break;
  }

  console.log("list of tasks: ", listOfItem);
});

// handelers
function submitTaskBtnHandler() {
  let taskName = taskInput.value; // get task name from input field
  let generatedId = generateUniqueId(); // generate unique id for easy future manipulations

  // cheking if task name entered
  if (taskName.length !== 0) {
    addNewTask(taskName, generatedId); // add task to data structure

    taskList.appendChild(createTaskElement(taskName, generatedId)) // create element

    taskInput.value = ""; // clear input element

    createBtn.disabled = true; // disable create task button

    console.log("listOfItem: ", listOfItem);
  }
}

// DOM manipulations functions
function createTaskElement(name, generateId) {
  let taskItem = document.createElement('div');
  let taskCheckbox = document.createElement('input');
  let taskText = document.createElement('p');
  let taskBtns = document.createElement('div');
  let taskDeleteBtn = document.createElement('button');

  taskCheckbox.id = generateId;
  taskCheckbox.type = 'checkbox';
  taskCheckbox.checked = false;

  taskItem.id = generateId;
  taskText.id = generateId;
  taskDeleteBtn.id = generateId;

  taskText.innerHTML = name; // set task name
  taskDeleteBtn.innerHTML = 'delete'; // set task name

  taskItem.classList.add('list-item'); // add styling to main task container
  taskText.classList.add('list-item-p'); // add styling to main task container
  taskCheckbox.classList.add('list-item-checkbox'); // add styling to main task container
  taskDeleteBtn.classList.add('list-item-deleteBtn'); // add styling to main task container

  taskItem.appendChild(taskCheckbox);
  taskItem.appendChild(taskText);
  taskItem.appendChild(taskBtns);

  taskBtns.appendChild(taskDeleteBtn);

  return taskItem;
}
function deleteTaskElement(id) {
  document.getElementById(id).remove();
}
function changeStatusTaskElement(id) {
  let checkboxElem = document.getElementById(id).querySelector('input[type=checkbox]');
  let item = listOfItem.find(item => item.id === id);
  checkboxElem.checked = item.isDone;

  if(item.isDone === true) {
    document.getElementById(id).classList.add('task-done');
  } else {
    document.getElementById(id).classList.remove('task-done');
  }
}

// data manipulations functions
function addNewTask(name, id) {
  listOfItem.push({
    id: id,
    name: name,
    isDone: false,
    createdAt: new Date(),
    editedAt: new Date(),
  });
}
function changeStatusTaskById(id) {
  const newFormatedList = listOfItem.map(item => {
    if (item.id === id) {
      return {
        id: item.id,
        name: item.name,
        isDone: item.isDone === false ? true : false,
        createdAt: item.createdAt,
        editedAt: new Date()
      }
    } else {
      return item;
    }
  });
  listOfItem = newFormatedList;
}
function deleteTaskById(id) {
  const newFormatedList = listOfItem.filter(item => item.id !== id);
  listOfItem = newFormatedList;
}

// helpers
function generateUniqueId() {
  return Math.random().toString(16).slice(2);
}

// todo: add render function, where we can pass edited, sorted, filtered list of tasks