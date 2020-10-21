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