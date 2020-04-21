'use strict';

import users from './users.js';

const calculateTotalBalance = (users) => {
  return users.reduce((total, user) => total + user.balance, 0);
};

console.log(calculateTotalBalance(users)); // 20916
