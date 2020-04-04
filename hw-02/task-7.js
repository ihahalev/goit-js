'use strict';

const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];

const isLoginValid = function(login) {
  const minLength = 4;
  const maxLength = 16;
  if (login.length < minLength) {
    return false;
  }
  if (login.length > maxLength) {
    return false;
  }
  return true;
};

const isLoginUnique = function(allLogins, login) {
  if (allLogins.includes(login)) {
    return false;
  }
  return true;
};

const addLogin = function(allLogins, login) {
  const valid = isLoginValid(login);
  const unique = isLoginUnique(allLogins, login);
  let message;
  if (!valid) {
    return (message = 'Ошибка! Логин должен быть от 4 до 16 символов');
  }
  if (!unique) {
    return (message = 'Такой логин уже используется!');
  }
  return (message = 'Логин успешно добавлен!');
};

console.log(addLogin(logins, 'Ajax'));
console.log(addLogin(logins, 'robotGoogles'));
console.log(addLogin(logins, 'Zod'));
console.log(addLogin(logins, 'jqueryisextremelyfast'));
