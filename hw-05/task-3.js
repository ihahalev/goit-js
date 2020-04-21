'use strict';

class Storage {
  constructor(_items) {
    this._items = _items;
  }

  get items() {
    return this._items;
  }

  getItems() {
    return this._items;
  }

  addItem(item) {
    this._items.push(item);
  }

  removeItem(item) {
    for (let i = 0; i < this._items.length; i += 1) {
      if (item === this._items[i]) {
        this._items.splice(i, 1);
      }
    }
  }
}

const storage = new Storage([
  'Нанитоиды',
  'Пролонгер',
  'Железные жупи',
  'Антигравитатор',
]);

const items = storage.getItems();
console.table(items);

storage.addItem('Дроид');
console.table(storage.items);

storage.removeItem('Пролонгер');
console.table(storage.items);
