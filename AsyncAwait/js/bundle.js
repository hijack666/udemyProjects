/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function calc() {

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio = 1.375;

    if ( localStorage.getItem('sex')) { // Запоминаем данные
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
    if ( localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach( elem => {
            elem.classList.remove(activeClass);
            if ( elem.getAttribute('id') === localStorage.getItem('sex') ) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio') ) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if ( !sex || !height || !weight || !age || !ratio ) {
            result.textContent = '____';
            return;
        }

        if ( sex === 'female' ) {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach( elem => {
            elem.addEventListener('click', (e)=> {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });

    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) { // Проверка ввода
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height': 
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
        
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function cards() {
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

    const getResource = async (url) => { 
        const res = await fetch(url);

        if (!res.ok) { //типа catch, если что то пошло не так
           throw new Error(`Could not fetch ${url}, status: ${res.status}`); // выкидываем ошибку
        }
 
        return await res.json(); // Promise => тоже добавляем await 
    };

    // Библиотека axios
    axios.get('http://localhost:3000/menu')
        // .then(data => console.log(data)) // Получаем сразу объект
        .then(data => {
            data.data.forEach( ({img, altimg, title, descr, price}) => {  //Деструктуризация
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data)); // Больше не надо создавать

    function createCard(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            const element = document.createElement('div');
            element.classList.add('menu__item');

            element.innerHTML = `<img src=${img} alt="${altimg}">
            <h3 class="menu__item-subtitle">${title}</h3>
            <div class="menu__item-descr">${descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${price}</span> грн/день</div>
            </div>`;

            document.querySelector('.menu .container').append(element);
        });
    }
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function forms() {
    // Формы с запросами
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => { //Добавляя 'async' говорим что внутри ф-ции будет асинхронный код
        const res = await fetch(url, { // Добавляя await - ждем выполнение этой операции
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json(); // Promise => тоже добавляем await 
    };



    // function postData(form) {
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMsg = document.createElement('img');
            // statusMsg.classList.add('status');
            statusMsg.src = message.loading;
            statusMsg.style.cssText = 'display: block; margin: 0 auto;';
            // statusMsg.textContent = message.loading;
            form.append(statusMsg);
            form.insertAdjacentElement('afterend', statusMsg); // располагаем спиннер после формы

            const formData = new FormData(form);

            const object = {}; // Новая переменная json
            const json = JSON.stringify(Object.fromEntries(formData.entries())); //Сначала превращам в массив массивов, затем в объект и затем снова в json

            formData.forEach(function(value, key) { // Перебираем формДату и превращаем в json
                object[key] = value; 
            });
            
            postData('http://localhost:3000/requests', json)
                .then( data => {
                    console.log(data);
                    showThanksModal(message.success);
                
                    statusMsg.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(()=> {
                    form.reset(); // Очистка формы в любом случае
                });

        });
    }
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function modal() {
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
            // вырубаем прокрутку страницы
        
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


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    // https://keycode.info/
    document.addEventListener('keydown', (e) => { 
        if (e.code === 'Escape' && modal.classList.contains('show') ) {

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

    // ShowThanksModal
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
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function slider() {
    /* Слайдер 1 варимант Slider */
    const slides = document.querySelectorAll('.offer__slide');
    const prev = document.querySelector('.offer__slider-prev');
    const next = document.querySelector('.offer__slider-next');
    const total = document.querySelector('#total');
    const current = document.querySelector('#current');

    const slider = document.querySelector('.offer__slider');

    let sliderIndex = 1;

    // showSlides(sliderIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = `${slides.length}`;
    // }

    // function showSlides(n) {
    //     if (n > slides.length ) {
    //         sliderIndex = 1;
    //     }

    //     if (n < 1) {
    //         sliderIndex = slides.length;
    //     }

    //     slides.forEach( item => {
    //         item.style.display = 'none';
    //     });

    //     slides[sliderIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         current.textContent = `0${sliderIndex}`;
    //     } else {
    //         current.textContent = `${sliderIndex}`;
    //     }
    // }

    // function plusSlides (n) {
    //     showSlides(sliderIndex += n);
    // }

    // prev.addEventListener('click', ()=> {
    //     plusSlides(-1);
    // });
    // next.addEventListener('click', ()=> {
    //     plusSlides(1);
    // })

    /* Слайдер 2 варимант Slider carousel карусель */

    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const slidesField = document.querySelector('.offer__slider-inner');
    const width = window.getComputedStyle(slidesWrapper).width; //получили ширину 
    let offset = 0; // отступ

    function slidesLessDec() {
        if (slides.length < 10) {
            current.textContent = `0${sliderIndex}`;
        } else {
            current.textContent = sliderIndex;
        }
    }

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${sliderIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = sliderIndex;
    }

    slidesField.style.width = 100 * slides.length + '%'; // Задаем иннеру ширину, будто в нем находятся все слайдеры
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width; // Все слайды одинаковой ширины
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) { // Создаем список индикаторов
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function activeIndicator() {
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[sliderIndex - 1].style.opacity = 1;
    }

    function deleteNotDigits(string) {
        return +string.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        // if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) { // '500px' -> 500
        // if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) { // Регулярные выражения, удаляем все не числа
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (sliderIndex == slides.length) {
            sliderIndex = 1;
        } else {
            sliderIndex++;
        }

        slidesLessDec();

        activeIndicator();

    });

    prev.addEventListener('click', () => {
        if (offset == 0) { // '500px' -> 500
        offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (sliderIndex == 1) {
            sliderIndex = slides.length;
        } else {
            sliderIndex--;
        }

        slidesLessDec();

        activeIndicator();
    });

    dots.forEach( dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            sliderIndex = slideTo;
            // offset = +width.slice(0, width.length - 2) * (slides.length - 1);
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            slidesLessDec();

            activeIndicator();
        });
    });
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

// ТАБЫ

function tabs() {
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
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

// ТАЙМЕР
function timer() {
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
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
window.addEventListener('DOMContentLoaded', () =>{
    // ТАБЫ
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");

    // ТАЙМЕР
    const timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

    // Классы для карточек
    const cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");

    // Модальное окно модал modal
    const modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");

    // Формы с запросами
    const forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");

    

    /* Слайдер 1 варимант Slider */
    const slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

    // Калькулятор Calc
    const calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
    
    tabs();
    timer();
    modal();
    cards();
    forms();
    slider();
    calc();

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map