const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const todoList = document.getElementById("incompleteTasks");
const completedTasksList = document.getElementById("completed-tasks");

const createElement = function (tag, props, children) {
  const element = document.createElement(tag);
  Object.assign(element, props || {});
  (children || []).forEach(function (child) {
    element.appendChild(child);
  });
  return element;
};

const createNewTaskElement = function (taskText) {
  const checkbox = createElement("input", { type: "checkbox" });
  // innerText (not innerHTML), so that <, >, & in the task text are not interpreted as markup
  const label = createElement("label", {
    className: "task",
    innerText: taskText,
  });
  const editInput = createElement("input", { type: "text", className: "task" });
  const editButton = createElement("button", {
    className: "edit",
    innerText: "Edit",
  });
  const deleteButtonImage = createElement("img", { src: "./remove.svg" });
  const deleteButton = createElement("button", { className: "delete" }, [
    deleteButtonImage,
  ]);

  return createElement("li", {}, [
    checkbox,
    label,
    editInput,
    editButton,
    deleteButton,
  ]);
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  todoList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

const enterEditMode = function (listItem) {
  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");

  editInput.value = label.innerText;
  editButton.innerText = "Save";
  listItem.classList.add("editMode");
};

const exitEditMode = function (listItem) {
  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");

  label.innerText = editInput.value;
  editButton.innerText = "Edit";
  listItem.classList.remove("editMode");
};

const editTask = function () {
  const listItem = this.parentNode;
  if (listItem.classList.contains("editMode")) {
    exitEditMode(listItem);
  } else {
    enterEditMode(listItem);
  }
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const parentList = listItem.parentNode;
  parentList.removeChild(listItem);
};

const moveTask = function (taskListItem, targetList, nextCheckboxHandler) {
  targetList.appendChild(taskListItem);
  bindTaskEvents(taskListItem, nextCheckboxHandler);
};

const taskCompleted = function () {
  moveTask(this.parentNode, completedTasksList, taskIncomplete);
};

const taskIncomplete = function () {
  moveTask(this.parentNode, todoList, taskCompleted);
};

addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < todoList.children.length; i++) {
  bindTaskEvents(todoList.children[i], taskCompleted);
}

for (let j = 0; j < completedTasksList.children.length; j++) {
  bindTaskEvents(completedTasksList.children[j], taskIncomplete);
}
