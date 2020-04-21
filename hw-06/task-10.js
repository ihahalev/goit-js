'use strict';

import users from './users.js';

const getSortedUniqueSkills = (users) => {
  return users
    .reduce((allSkills, user) => {
      user.skills.forEach((skill) => {
        if (!allSkills.includes(skill)) {
          allSkills.push(skill);
        }
      });
      return allSkills;
    }, [])
    .sort();
};

console.log(getSortedUniqueSkills(users));
// [ 'adipisicing', 'amet', 'anim', 'commodo', 'culpa', 'elit', 'ex', 'ipsum', 'irure', 'laborum', 'lorem', 'mollit', 'non', 'nostrud', 'nulla', 'proident', 'tempor', 'velit', 'veniam' ]
