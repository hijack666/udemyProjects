window.addEventListener('DOMContentLoaded', () =>{
    // ТАБЫ
    const tabs = require('./modules/tabs');

    // ТАЙМЕР
    const timer = require('./modules/timer');

    // Классы для карточек
    const cards = require('./modules/cards');

    // Модальное окно модал modal
    const modal = require('./modules/modal');

    // Формы с запросами
    const forms = require('./modules/forms');

    

    /* Слайдер 1 варимант Slider */
    const slider = require('./modules/slider');

    // Калькулятор Calc
    const calc = require('./modules/calc');
    
    tabs();
    timer();
    modal();
    cards();
    forms();
    slider();
    calc();

});