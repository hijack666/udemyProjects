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

const getResource = async (url) => { 
    const res = await fetch(url);

    if (!res.ok) { //типа catch, если что то пошло не так
       throw new Error(`Could not fetch ${url}, status: ${res.status}`); // выкидываем ошибку
    }

    return await res.json(); // Promise => тоже добавляем await 
};

export {postData};
export {getResource};