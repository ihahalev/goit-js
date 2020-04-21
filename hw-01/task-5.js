'use strict';

const userCountry = prompt('Укажите вашу страну');

const CHINA = 'Китай';
const CHILE = 'Чили';
const AUSTRALIA = 'Австралия';
const INDIA = 'Индия';
const JAMAICA = 'Ямайка';

const chinaPostCost = 100;
const chilePostCost = 250;
const australiaPostCost = 170;
const indiaPostCost = 80;
const jamaicaPostCost = 120;

if (userCountry) {
  switch (userCountry.toLowerCase()) {
    case CHINA.toLowerCase():
      alert(`Доставка в ${CHINA} будет стоить ${chinaPostCost} кредитов`);

      break;

    case CHILE.toLowerCase():
      alert(`Доставка в ${CHILE} будет стоить ${chilePostCost} кредитов`);

      break;

    case AUSTRALIA.toLowerCase():
      alert(
        `Доставка в ${AUSTRALIA} будет стоить ${australiaPostCost} кредитов`,
      );

      break;

    case INDIA.toLowerCase():
      alert(`Доставка в ${INDIA} будет стоить ${indiaPostCost} кредитов`);

      break;

    case JAMAICA.toLowerCase():
      alert(`Доставка в ${JAMAICA} будет стоить ${jamaicaPostCost} кредитов`);

      break;

    default:
      alert('В вашей стране доставка не доступна');
  }
}
