const KEY = "todo-tasks";

let listOfItem = JSON.parse(window.localStorage.getItem(KEY)) || [];

// selectors
let createBtn = document.querySelector('#create');
let taskInput = document.querySelector('#taskName');
let taskList = document.querySelector('body > section > main > div.list');

// template / render functions
function template() {
  if (listOfItem.length <= 0) {
    return `<p>No tasks yet! Please add new one!</p>`
  } else {
    return listOfItem.map(item => {
      let str = "";
      str += `<div id=${item.id} class=${item.isDone === true ? 'list-item-done' : 'list-item'}>`;
      str += `<input id=${item.id} type='checkbox' class='list-item-checkbox' ${item.isDone === true ? 'checked' : null}>`;
      str += `<p id=${item.id} class='list-item-p'>${item.name}</p>`;
      if(item.isDone === true) {
        str += `<button id=${item.id} class='list-item-deleteBtn'>delete</button>`;
      }
      str += `</div>`;
      return str;
    }).join(''); // to delete comma from list
  }
}
function render() {
  saveLocalStorage();
  taskList.innerHTML = template();
}

// event listeners
createBtn.addEventListener('click', submitTaskBtnHandler);
taskInput.addEventListener('input', enteringTaskNameHander);
document.addEventListener('keydown', keyboardHandler);
taskList.addEventListener('click', taskClickHandler);

// handers
function submitTaskBtnHandler() {
  let taskName = taskInput.value; // get task name from input field
  let generatedId = generateUniqueId(); // generate unique id for easy future manipulations

  // cheking if task name entered
  if (taskName.length !== 0) {
    addNewTask(taskName, generatedId);

    render(); // render new ui

    taskInput.value = ""; // clear input element

    createBtn.disabled = true; // disable create task button
  }
}
function keyboardHandler(event) {
  if (event.keyCode === 13) { // on user press enter button, we create task
    submitTaskBtnHandler()
  }
}
function enteringTaskNameHander(event) {
  if (event.target.value.length === 0) {
    createBtn.disabled = true;
  } else {
    createBtn.disabled = false;
  }
}
function taskClickHandler(event) {
  let gettedId = event.path[0].id;

  switch (event.path[0].classList[0]) {
    case "list-item-checkbox": // change status of task
      console.log("pressed checkBox, id: ", gettedId);
      changeStatusTaskById(gettedId); // change status item at data structure
      render(); // re-render UI
      break;
    case "list-item": // mark task as done
      console.log("pressed div, id: ", gettedId);
      changeStatusTaskById(gettedId); // change status item at data structure
      render(); // re-render UI
      break;
    case "list-item-p": // mark task as done
      console.log("pressed div, id: ", gettedId);
      changeStatusTaskById(gettedId); // change status item at data structure
      render(); // re-render UI
      break;
    case "list-item-deleteBtn": // delete task
      console.log("pressed delete, id: ", gettedId);
      deleteTaskById(gettedId); // remove item from data structure
      render(); // re-render UI
      break;
  }

  console.log("list of tasks: ", listOfItem);
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
  let newFormatedList = listOfItem.map(item => {
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

// localStorage helpers
function saveLocalStorage() {
  window.localStorage.setItem(KEY, JSON.stringify(listOfItem));
}

render(); // render UI