'use strict';

const log = function(a, b, ...rest) { // ...rest - rest operator - бесконечное кол-во аргументов, можно писать "...whatever" - что угодно
    console.log(a, b, rest);
};

log('keka', 'suka', 'dsads', 'sads', 'asds', 'dsaa'); // выведет a b, и массив

function calcOrDouble(number, basis) {
    basis = basis || 2; // если basis не будет передан, то вместо него вернется 2, не совсем надежно
    console.log(number * basis);
}

calcOrDouble(3, 6); //18
calcOrDouble(3); //6

function calc(number, basis = 2) {
    console.log(number * basis);
}
calc(6); // 12
calc(6, 5); // 30