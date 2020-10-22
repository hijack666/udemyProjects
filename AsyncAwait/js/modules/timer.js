// ТАЙМЕР
function timer(id, deadline) {
    // const deadline = '2020-08-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), // endtime количество мс в конечном времени, отнимаем текущую дату
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // количество дней из миллисекунд
            hours = Math.floor(( t / (1000 * 60 * 60) % 24 )), // остаток, чтобы не получилось 100500 часов
            minutes = Math.floor(( t / 1000 / 60) % 60), // получаем минуты
            seconds = Math.floor(( t / 1000 ) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) { // Подставляем 0
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock(); // разовый вызов функции, чтобы при запуске страницы время обновилось сразу, а не через секунду

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);  // если разница между временем стала = 0, то перестаем обновлять счетчик
            }
        }
    }

    setClock(id, deadline);
}

export default timer;