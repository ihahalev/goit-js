'use strict';

import users from './users.js';

const getUsersWithGender = (users, gender) => {
  return users.reduce((namesByGender, user) => {
    if (user.gender === gender) {
      namesByGender.push(user.name);
    }
    return namesByGender;
  }, []);
};

console.log(getUsersWithGender(users, 'male')); // [ 'Moore Hensley', 'Ross Vazquez', 'Carey Barr', 'Blackburn Dotson' ]
