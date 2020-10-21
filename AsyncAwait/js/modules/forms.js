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