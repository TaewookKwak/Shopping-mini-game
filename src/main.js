'use strict'
//JSON 파일을 불러 온다.
function loadItems(){
    return fetch('data/data.json')
    //성공적으로 받아오면, json으로 변환하고
    .then(response => response.json())
    //json안 에 있는 items들을 리턴한다 
    .then(json => json.items);
}

// 아이템을 인자로 받고, html요소로 변환 하고 페이지에 표기
function displayItems(items){
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

//받아온 데이터를 HTML 리스트 아이템들을 만듬
function createHTMLString(item){
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumnail">
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

// function visualizeItems(items, key, value) {
//     items.forEach(item => {
//         console.log(item, item[key], key, value);
//         if(item[key] === value){
//             const container = document.querySelectorAll('.item');
            
//         } else{
//         }
//     });
// }

function onButtonClick(event, items){
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    // console.log(event.target.dataset.key);
    // console.log(event.target.dataset.value);
    if(key === null || value === null){
        return;
    }
    //visualizeItems(items, key, value);
    displayItems(items.filter(item => item[key] === value));
}


function setEventListeners(items){
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', ()=> displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}

// main
loadItems()
.then(items => {
    displayItems(items);
    setEventListeners(items);
})
.catch(console.log);