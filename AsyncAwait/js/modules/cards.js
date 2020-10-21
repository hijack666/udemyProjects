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