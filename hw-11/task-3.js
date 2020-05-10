'use strict';

class CountdownTimer {
  constructor({ selector, targetDate = Date.now() }) {
    this.targetDate = targetDate;
    this.isActive = false;
    this.timer = document.querySelector(selector);
    this.refs = {
      domDays: this.timer.querySelector('span[data-value="days"]'),
      domHours: this.timer.querySelector('span[data-value="hours"]'),
      domMins: this.timer.querySelector('span[data-value="mins"]'),
      domSecs: this.timer.querySelector('span[data-value="secs"]'),
    };
  }

  startTimeout() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    this.idTimer = setInterval(() => {
      const time = this.targetDate - Date.now();
      if (time < 0) {
        this.stopTimeout();
        return;
      }
      /*
       * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
       * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
       */
      const days = Math.floor(time / (1000 * 60 * 60 * 24));

      /*
       * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
       * остатка % и делим его на количество миллисекунд в одном часе
       * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
       */
      const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      /*
       * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
       * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
       */
      const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

      /*
       * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
       * миллисекунд в одной секунде (1000)
       */
      const secs = Math.floor((time % (1000 * 60)) / 1000);

      this.refs.domDays.textContent = this.padNumers(days);
      this.refs.domHours.textContent = this.padNumers(hours);
      this.refs.domMins.textContent = this.padNumers(mins);
      this.refs.domSecs.textContent = this.padNumers(secs);
    }, 1000);
  }
  stopTimeout() {
    this.isActive = false;
    clearInterval(this.idTimer);
    this.refs.domDays.textContent = this.padNumers(0);
    this.refs.domHours.textContent = this.padNumers(0);
    this.refs.domMins.textContent = this.padNumers(0);
    this.refs.domSecs.textContent = this.padNumers(0);
  }
  padNumers(num) {
    return String(num).padStart(2, '0');
  }
}
const saleTimeout = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Sep 17, 2020'),
});

saleTimeout.startTimeout();
