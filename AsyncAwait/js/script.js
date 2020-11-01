require('es6-promise').polyfill(); // полифилл для es6 промисов, которые не работают в IE
import 'nodelist-foreach-polyfill'; // Тоже для IE, запись имеет свою особенность - пакет подключится именно в этот скриптовый файл

// ТАБЫ
import tabs from './modules/tabs';

// ТАЙМЕР
import timer from './modules/timer';

// Классы для карточек
import cards from './modules/cards';

// Модальное окно модал modal
import modal from './modules/modal';
import {openModal} from './modules/modal';
import {closeModal} from './modules/modal';

// Формы с запросами
import forms from './modules/forms';

/* Слайдер 1 варимант Slider */
import slider from './modules/slider';

// Калькулятор Calc
import calc from './modules/calc';
window.addEventListener('DOMContentLoaded', () =>{

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2020-10-30');
    modal('[data-modal]', '.modal', modalTimerId);
    openModal('.modal', modalTimerId);
    closeModal('.modal', modalTimerId);
    cards();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide', 
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev', 
        totalCounter: '#total', 
        currentCounter: '#current', 
        wrapper: '.offer__slider-wrapper', 
        field: '.offer__slider-inner'
    });
    calc();

});