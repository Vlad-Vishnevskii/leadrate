const todoList = document.querySelector('.todo__list');
const itemTemplate = document.querySelector('#item')
    .content
    .querySelector('.todo__item');
let userQuantity = 0;
let randomDescription;
const percentageOfDuplication = 25;
let probabilityOfDuplication;
let randomUserTaskCount = 0;
let taskStartIndex;
let arrayDouble = [];

const getNumberOfDuplicateItems = (arr) => arr.length - [...new Set(arr)].length;

const renderTask = function (element, data) {
  const item = itemTemplate.cloneNode(true);
  const itemLabel = item.querySelector('.custom-toggle__label');
  const itemDescription = item.querySelector('.custom-toggle__description');
  const checkbox = item.querySelector('input');
  itemLabel.textContent = element.title;
  if (!taskStartIndex) {
    taskStartIndex = element.id;
  }
  randomDescription = getRandomInt(taskStartIndex, taskStartIndex + randomUserTaskCount - 1);
  arrayDouble.push(data[randomDescription - 1].id);
  probabilityOfDuplication = (randomUserTaskCount / 100) * percentageOfDuplication;
  if (getNumberOfDuplicateItems(arrayDouble) <= probabilityOfDuplication) {
    itemDescription.textContent = data[randomDescription - 1].title;
  } else {
    itemDescription.textContent = '';
  }
  if (element.completed) {
    checkbox.checked = true;
  }
  return item;
};

const fillElements = function (data) {
  const fragment = document.createDocumentFragment();
  findUserQuantity(data);
  const randomUser = getRandomInt(1, userQuantity);
  findUserTaskCount(data, randomUser);
  for (let i = 0; i < data.length; i++) {
    if (data[i].userId === randomUser) {
      fragment.appendChild(renderTask(data[i], data));
    }
  }
  todoList.appendChild(fragment);
};

const findUserQuantity = (data) => {
  data.forEach((item) => {
    if (item.userId > userQuantity) {
      userQuantity = item.userId;
    }
  });
};

const findUserTaskCount = (data, user) => {
  data.forEach((item) => {
    if (item.userId === user) {
      randomUserTaskCount += 1;
    }
  });
};

const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const addTask = (data) => {
  const taskList = data;
  fillElements(taskList);
};
