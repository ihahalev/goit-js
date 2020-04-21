'use strict';

/*
 * Типов транзацкий всего два.
 * Можно положить либо снять деньги со счета.
 */
const Transaction = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
};

/*
 * Каждая транзакция это объект со свойствами: id, type и amount
 */

const account = {
  // Текущий баланс счета
  balance: 0,

  // История транзакций
  transactions: [],

  /*
   * Метод создает и возвращает объект транзакции.
   * Принимает сумму и тип транзакции.
   */
  createTransaction(amount, type) {
    let id = 0;
    const lngt = this.transactions.length;
    if (!lngt) {
      id = 1;
    } else {
      id = this.transactions[lngt - 1].id + 1;
    }
    return { id, type, amount };
  },

  /*
   * Метод отвечающий за добавление суммы к балансу.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций
   */
  deposit(amount) {
    if (amount <= 0) {
      return console.log('Сумму нельзя добавить');
    }
    this.balance += amount;
    const transaction = this.createTransaction(amount, Transaction.DEPOSIT);
    this.transactions.push(transaction);
    return transaction;
  },

  /*
   * Метод отвечающий за снятие суммы с баланса.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций.
   *
   * Если amount больше чем текущий баланс, выводи сообщение
   * о том, что снятие такой суммы не возможно, недостаточно средств.
   */
  withdraw(amount) {
    if (amount > this.balance) {
      return console.log('Недостатосно средств для снятия');
    }
    this.balance -= amount;
    const transaction = this.createTransaction(amount, Transaction.WITHDRAW);
    this.transactions.push(transaction);
    return transaction;
  },

  /*
   * Метод возвращает текущий баланс
   */
  getBalance() {
    return this.balance;
  },

  /*
   * Метод ищет и возвращает объект транзации по id
   */
  getTransactionDetails(id) {
    for (const item of this.transactions) {
      // console.log(id);
      // console.log(item.id);
      if (item.id === id) {
        return item;
      }
    }
    return 'Транзакция не найдена';
  },

  /*
   * Метод возвращает количество средств
   * определенного типа транзакции из всей истории транзакций
   */
  getTransactionTotal(type) {
    let totalOfType = 0;
    for (const item of this.transactions) {
      if (item.type == type) {
        totalOfType += item.amount;
      }
    }
    return totalOfType;
  },
};

account.deposit(-150);
account.deposit(150);
account.deposit(200);
account.deposit(100);
account.deposit(300);
console.log('balance:', account.getBalance());

account.withdraw(1000);
account.withdraw(500);
account.withdraw(200);
console.log('balance:', account.getBalance());
console.log('all trasactions:', account.transactions);
console.log('details:', account.getTransactionDetails(10));
console.log('details:', account.getTransactionDetails(3));
console.log('deposite:', account.getTransactionTotal(Transaction.DEPOSIT));
console.log('withdraw:', account.getTransactionTotal(Transaction.WITHDRAW));
