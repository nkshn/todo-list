const KEY = "todo-tasks";

let listOfItem = JSON.parse(window.localStorage.getItem(KEY)) || [];

let editedTaskId;

// selectors
let createBtn = document.querySelector('#create');
let taskInput = document.querySelector('#taskName');
let taskList = document.querySelector('body > section > main > div.list');

// template / render functions
function template() {
  if (listOfItem.length <= 0) {
    return `<p>No tasks yet! Please add new one!</p>`
  } else {
    let counter = 0;
    let renderedStr = "";
    
    // list of todo's
    renderedStr += listOfItem.map(item => {
      let str = "";
      str += `<div id=${item.id} class=${item.isDone === true ? 'list-item-done' : 'list-item'}>`;
      str += `<input id=${item.id} type='checkbox' class='list-item-checkbox' ${item.isDone === true ? 'checked' : null}>`;
      str += `<p id=${item.id} class='list-item-p'>${item.name}</p>`;
      if(item.isDone === true) { // if task is done, show delete btn
        counter++; // counting competed tasks
        str += `<button id=${item.id} class='list-item-deleteBtn'>delete</button>`; // if task completed we show delete btn
      } else { // if task is not done, show edit btn
        str += `<button id=${item.id} class='list-item-editBtn'>edit</button>`;
      }
      str += `</div>`;
      
      return str;
    }).join(''); // to delete comma from list
    
    // important bottom info
    renderedStr += `<div class='bottom'>`;
    renderedStr += `<p>Done tasks: ${counter}/${listOfItem.length}</p>`;
    
    if(counter === 0) {
      renderedStr += `<button id="remove" class="removeBtn" disabled>remove done tasks</button>`;
    } else {
      renderedStr += `<button id="remove" class="removeBtn">remove done tasks</button>`;
    }
    
    renderedStr += `</div>`;

    return renderedStr;
  }
}
function render() {
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

  /**
   * docs:
   * if text of btn is "Create", we create new task
   * if text of btn is "Save", we edit specific task
   */
  let mainBtnText = createBtn.textContent.toLowerCase();

  if (taskName.length !== 0) {
    if(mainBtnText === "create") {
      addNewTask(taskName, generatedId);

      saveLocalStorage(); // save new list of tasks to localStorage

      render(); // render new ui

      taskInput.value = ""; // clear input element

      createBtn.disabled = true; // disable create task button
    }
    if(mainBtnText === "save") {
      editTaskById(taskName);

      saveLocalStorage(); // save new list of tasks to localStorage

      render(); // render new ui

      taskInput.value = ""; // clear input element

      createBtn.textContent = "create"; // disable create task button
      createBtn.disabled = true; // disable create task button
    }
  }
}
function keyboardHandler(event) {
  if (event.keyCode === 13) { // on user press enter button, we create task
    submitTaskBtnHandler();
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
  // console.log("event.path[0].classList[0]: ", event.path[0].classList[0])
  switch (event.path[0].classList[0]) {
    case "list-item-checkbox": // change status of task
      changeStatusTaskById(gettedId); // change status item at data structure
      saveLocalStorage(); // save new list of tasks to localStorage
      render(); // re-render UI
      break;
    case "list-item": // mark task as done
      changeStatusTaskById(gettedId); // change status item at data structure
      saveLocalStorage(); // save new list of tasks to localStorage
      render(); // re-render UI
      break;
    case "list-item-p": // mark task as done
      changeStatusTaskById(gettedId); // change status item at data structure
      saveLocalStorage(); // save new list of tasks to localStorage
      render(); // re-render UI
      break;
    case "list-item-editBtn": // edit specific task
      editTaskByIdHandler(gettedId); // edit item from data structure
      // saveLocalStorage(); // save new list of tasks to localStorage
      // render(); // re-render UI
      break;
    case "list-item-deleteBtn": // delete specific task
      deleteTaskById(gettedId); // remove item from data structure
      saveLocalStorage(); // save new list of tasks to localStorage
      render(); // re-render UI
      break;
    case "removeBtn": // remove all done tasks
      removeDoneTasks() // remove all done tasks from data structure
      saveLocalStorage(); // save new list of tasks to localStorage
      render(); // re-render UI
      break;
  }
}
function removeDoneTasksHandler() {
  removeDoneTasks();
}
function editTaskByIdHandler(id) {
  const editedTask = listOfItem.find(item => item.id === id);
  console.log("editedTask: ", editedTask, " id: ", id);

  editedTaskId = id;
  
  taskInput.value = editedTask.name;
  taskInput.focus();
  createBtn.textContent = "Save";
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
function editTaskById(name) {
  const newFormatedList = listOfItem.map(item => {
    if(item.id === editedTaskId) {
      return {
        id: item.id,
        name: name,
        isDone: item.isCheked,
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
function removeDoneTasks() {
  const newFormatedList = listOfItem.filter(item => item.isDone !== true);
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