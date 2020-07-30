function timer(deadline, selector) {

  let deadlineTimer = (deadline) => {
    let total = Date.parse(deadline) - Date.parse(new Date),
        seconds = total / 1000 % 60,
        minutes = Math.floor(total / (1000 * 60) % 60),
        hours = Math.floor(total  / (1000 * 60 * 60) % 24),
        days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      seconds,
      minutes,
      hours,
      days
    };
  };

  const updateClock = (selector, deadline) => {
    const container = document.querySelector(selector),
          days = container.querySelector('#days'),
          hours = container.querySelector('#hours'),
          minutes = container.querySelector('#minutes'),
          seconds = container.querySelector('#seconds');

    const update = () => {
      const info = deadlineTimer(deadline);
      info.days.toString().length === 1 ? days.textContent = `0${info.days}` : days.textContent = info.days;
      info.hours.toString().length === 1 ? hours.textContent = `0${info.hours}` : hours.textContent = info.hours;
      info.minutes.toString().length === 1 ? minutes.textContent = `0${minutes.days}` : minutes.textContent = info.minutes;
      info.seconds.toString().length === 1 ? seconds.textContent = `0${info.seconds}` : seconds.textContent = info.seconds;

      const timer = setTimeout(update, 1000);
      if (info.total <= 0) {
        clearTimeout(timer);
        days.textContent = `00`;
        hours.textContent = `00`;
        minutes.textContent = `00`;
        seconds.textContent = `00`;
      }
    };
    update();
  };
  updateClock(selector, deadline);
}

export default timer;
