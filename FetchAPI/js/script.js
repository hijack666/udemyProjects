window.addEventListener('DOMContentLoaded', ()=>{
    // ТАБЫ
    const tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            // item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {  // //дефолтное значени
        // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    // showTabContent(0); //дефолтное значение, либо при создании функции прописать аргумент "i = 0", а вызывать без аргумента
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) { // условие что не кликаем на родителя
            tabs.forEach((item, i)=>{
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // ТАЙМЕР

    const deadline = '2020-08-11';

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
    
    setClock('.timer', deadline);


    // Модальное окно модал modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');
        // modalCloseBtn = document.querySelector('[data-close]');

    // modalTrigger.addEventListener('click', () => {
    //     // modal.classList.add('show');
    //     // modal.classList.remove('hide');
    //     modal.classList.toggle('show');
    //     document.body.style.overflow = 'hidden'; // вырубаем прокрутку страницы
    // });

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal)
            // modal.classList.toggle('show');
            // document.body.style.overflow = 'hidden';
            ; // вырубаем прокрутку страницы
        
    });
    

    function closeModal() {
        // modal.classList.toggle('show');
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; 
    }

    function openModal() {
        // modal.classList.toggle('show');
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId); //Чтобы модалка через интервал времени не открывалась, если пользователь УЖЕ ее открывал
    }

    // modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    // https://keycode.info/
    document.addEventListener('keydown', (e) => { 
        if (e.code === 'Escape' && modal.classList.contains('show') ) {
            // modal.classList.remove('show');
            // document.body.style.overflow = ''; 
            closeModal();
        }
    });

    // Модальное окно появляется по скроллу до самого низа, либо через промежуток времени

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll () {
        if ( window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight ) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll); // подвох - при обновлении страницы - работать больше не будет

    // Классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) { // Rest REST operator оператор
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const elem = document.createElement('div');
            if (this.classes.length === 0) {
                this.elem = 'menu__item';
                elem.classList.add(this.elem);
            } else {
                this.classes.forEach(className => elem.classList.add(className)); // передаем класс каждому элементу псевдомассива 
            }
            elem.innerHTML = `
                <img src=${this.src} alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
            
                this.parent.append(elem);
        }

    }

    // const div = new MenuCard();
    // div.render(); // ===
    new MenuCard(
        "img/tabs/vegy.jpg", 
        "vegy", 
        'Меню "Фитнес"', 
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
        9,
        '.menu__field .container',
        'menu__item',
        'big'
    ).render();

    // прост создаем еще один такой подобный элемент
    // new MenuCard(
    //     "img/tabs/vegy.jpg", 
    //     "vegy", 
    //     'Меню "Фитнес"', 
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
    //     9,
    //     '.menu__field .container'
    // ).render(); 

    // POST запрос + php файл сервер
    // Forms
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMsg = document.createElement('img');
            // statusMsg.classList.add('status');
            statusMsg.src = message.loading;
            statusMsg.style.cssText = 'display: block; margin: 0 auto;';
            // statusMsg.textContent = message.loading;
            form.append(statusMsg);
            form.insertAdjacentElement('afterend', statusMsg); // располагаем спиннер после формы

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            // Переписываем на FETCH
            

            // request.setRequestHeader('Content-type', 'multipart/form-data'); // это хедеры для какого нибудь серва
            // request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); // чтобы отправлять json
            const formData = new FormData(form);

            const object = {};

            formData.forEach(function(value, key) { // Перебираем формДату и превращаем в json
                object[key] = value; 
            });

            // const json = JSON.stringify(object);

            // request.send(formData);
            // request.send(json);
            fetch('server.php', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body: formData
            })
            .then( data => data.text())
            .then( data => {
                console.log(data);
                showThanksModal(message.success);
                
                statusMsg.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(()=> {
                form.reset(); // Очистка формы в любом случае
            });

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         // statusMsg.textContent = message.success;
            //         showThanksModal(message.success);
            //         statusMsg.remove();
            //         form.reset();
                    
            //     } else {
            //         // statusMsg.textContent = message.failure;
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
            `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    // fetch('https://jsonplaceholder.typicode.com/todos/1')  // Get запрос
    //     .then(response => response.json())  // метод .json превращает объект в json
    //     .then(json => console.log(json));

    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: "POST",
    //     body: JSON.stringify({ name: "Alex"}),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // }) 
    // .then(response => response.json())  
    // .then(json => console.log(json));

    // fetch('db.json')
    //     .then(data => data.json())
    //     .then(res => console.log(res));
    //После запуска json-server
    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
});