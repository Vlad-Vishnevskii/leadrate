import {addTask} from './addTask';

const END_POINT = 'https://jsonplaceholder.typicode.com/todos';
const TIMEOUT_IN_MS = 10000;
const statusCode = {
  OK: 200,
};

const messageOfError = {
  400: 'Неверный запрос',
  401: 'Пользователь не авторизирован',
  403: 'Доступ запрещен',
  404: 'Ничего не найдено',
  500: 'Внутренняя ошибка сервера',
};

const method = {
  GET: 'GET',
  POST: 'POST',
};

const successHandler = function (data) {
  addTask(data);
};

const errorHandler = function (errorMessage) {
  // eslint-disable-next-line
  alert(errorMessage);
};

const createXhr = function (onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.status === statusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ${messageOfError[xhr.status]}`);
    }
  });

  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });
  xhr.addEventListener('timeout', function () {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  return xhr;
};

export const download = function () {
  const xhr = createXhr(successHandler, errorHandler);
  xhr.open(method.GET, END_POINT);
  xhr.send();
};
