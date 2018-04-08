/**
 * Suggest
 * @param {String} inputValue 
 */
const suggest = (inputValue) => { 
    let timestamp = Number(new Date());  
    const test = (streetName) => { 
        // изначально я тестировал строки через toLowerCase,
        // но потом обнаружил что это довольно дорогая операция.
        const rule = new RegExp(inputValue, 'i');
        return rule.test(streetName);
    };
    const result = [];

    for (let i = 0; i < streets.length; i++) {
        const streetName = streets[i];
        test(streetName) && result.push(streetName);
        if (result.length >= 10) {
            // выходим из цикла, если найдено необходимое количество элементов
            break;
        }
    };

    //логируем время выполнения
    console.log(`${Number(new Date()) - timestamp} ms`);
    return result;
};

// ВЫВОД В HTML
const input = document.getElementById('street');
const suggestContainer = document.querySelector('.suggest');
input.oninput = (e) => {
    suggestContainer.innerHTML = '';
    const value = e.target.value;
    if (value) {
        const suggestResult = suggest(value);
        for (let i = 0; i < suggestResult.length; i++) {
            const el = suggestResult[i];
            const suggestNode = document.createElement('div');
            suggestNode.textContent = el;
            suggestContainer.appendChild(suggestNode);
        }
    }
};

document.body.appendChild(suggestContainer);