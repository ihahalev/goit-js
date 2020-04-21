'use strict';

import users from './users.js';

const getUsersWithFriend = (users, friendName) => {
  return users.reduce((hasFriend, user) => {
    if (user.friends.find((friend) => friend === friendName)) {
      hasFriend.push(user.name);
    }
    return hasFriend;
  }, []);
};

console.log(getUsersWithFriend(users, 'Briana Decker')); // [ 'Sharlene Bush', 'Sheree Anthony' ]
console.log(getUsersWithFriend(users, 'Goldie Gentry')); // [ 'Elma Head', 'Sheree Anthony' ]
