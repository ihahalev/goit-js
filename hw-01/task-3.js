'use strict';

const ADMIN_PASSWORD = 'jqueryismyjam';
let message;
const user = prompt('Введите пароль администратора');

if (user === null) {
  message = 'Отменено пользователем!';
} else if (user === ADMIN_PASSWORD) {
  message = 'Добро пожаловать!';
} else {
  message = 'Доступ запрещен, неверный пароль!';
}

alert(message);
