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