'use strict';

const checkForSpam = function(message) {
  const SALE = 'sale';
  const SPAM = 'spam';
  const loweredMessage = message.toLowerCase();
  if (loweredMessage.includes(SALE)) {
    return true;
  }
  if (loweredMessage.includes(SPAM)) {
    return true;
  }
  return false;
};

console.log(checkForSpam('Latest technology news'));

console.log(checkForSpam('JavaScript weekly newsletter'));

console.log(checkForSpam('Get best sale offers now!'));

console.log(checkForSpam('[SPAM] How to earn fast money?'));
