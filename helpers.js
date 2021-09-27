let listOfItem = [];

/*
  {
    id: "",
    name: "",
    isCheked: 0,
    createdAt: "",
    editedAt: "",
  }
*/

function addNewTask(name) {
  /**
   * TODO: add validations: 
   * task with this name already exists, try other name
   */

  listOfItem.push({
    // id: generateUniqueId(),
    id: listOfItem.length,
    name: name,
    isCheked: 1, // ?maybe false or 0 (!item.isCheked)
    createdAt: new Date(),
    editedAt: new Date(),
  });
}

function editTaskById(id, name) {
  // !Maybe: dont map list and just find only find one item?? because if id not exits

  if(name !== undefined) { // checking if we pass name to function
    const newFormatedList = listOfItem.map(item => {
      if(item.id === id) {
        return {
          id: item.id,
          name: name,
          isCheked: item.isCheked,
          createdAt: item.createdAt,
          editedAt: new Date()
        }
      } else {
        return item;
      }
    });
    listOfItem = newFormatedList;
  } else if(name === "") {
    deleteTaskById(id)
  }
}
function deleteTaskById(id) {
  const newFormatedList = listOfItem.filter(item => item.id !== id);
  listOfItem = newFormatedList;
}
function changeStatusTaskById(id) {
  // TODO: add validations if this task exists
  const newFormatedList = listOfItem.map(item => {
    if(item.id === id) {
      return {
        id: item.id,
        name: item.name,
        isCheked: item.isCheked === 0 ? 1 : 0, // ?maybe false or 0 (!item.isCheked)
        createdAt: item.createdAt,
        editedAt: new Date()
      }
    } else {
      return item;
    }
  });
  listOfItem = newFormatedList;
}

// helper function
function generateUniqueId() {
  return Math.random().toString(16).slice(2);
}

// addNewTask("test name");

// errors
/**
 * task with this name already exists, try other name
 * you cant delete this task, because it is not competed
 */

console.log("before: ", listOfItem);
addNewTask("test 1");
addNewTask("test 2");
addNewTask("test 3");
addNewTask("test 4");
console.log("after 1: ", listOfItem);
editTaskById(2, "Edit task");
console.log("after 2: ", listOfItem);
deleteTaskById(1);
console.log("after 3: ", listOfItem);
changeStatusTaskById(0);
console.log("after 4: ", listOfItem);

// TODO: add localStorage!!!