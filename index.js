const list = document.querySelector('.todoapp');
const down = document.querySelector('.fa-solid');
const input = document.querySelector('.new-todo');
const container = document.querySelector('.content');
const form = document.querySelector('.todoapp');
const numberOfElem = document.getElementById('numberOfElem');
const activeButton = document.getElementById('active');
const allButton = document.getElementById('first')
const clearButton = document.getElementById('clear')
const completeButton = document.getElementById('finished')

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (text) {
        createCard(text);
        input.value = '';
        updateElementCount();
        saveToLocalStorage(text);
    }
});

function createCard(text) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = text;
    container.appendChild(card);

    const checkbox = document.createElement('div');
    checkbox.classList.add('checkbox');
    card.appendChild(checkbox);

    checkbox.addEventListener('click', () => check(checkbox, card));
}

function check(checkbox, card) {
    const img = checkbox.querySelector('img');
    if (img) {
        checkbox.removeChild(img);
        card.classList.remove('checked');
    } else {
        const newImg = document.createElement('img');
        newImg.src = './assets/svgs/check-solid.svg';
        checkbox.appendChild(newImg);
        card.classList.add('checked');
    }
    updateElementCount();
}

function completed() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (card.classList.contains('checked')) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}


function allcheck(){
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (!card.classList.contains('checked')) {
            card.style.display = 'block';
        }
    });
}
function activecheck() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (card.classList.contains('checked')) {
            card.style.display = 'none';
        } else {
            card.style.display = 'block';
        }
    });
}

activeButton.addEventListener('click', activecheck);

allButton.addEventListener('click',allcheck);

function all() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.display = 'block';
    });
}

function clearing() {
    const cards = document.querySelectorAll('.card');
    let cardsInLocalStorage = JSON.parse(localStorage.getItem('cards')) || [];

    cards.forEach((card, index) => {
        if (card.classList.contains('checked')) {
            card.style.display = 'none';
            cardsInLocalStorage = cardsInLocalStorage.filter((card, idx) => idx !== index);
        }
    });

    localStorage.setItem('cards', JSON.stringify(cardsInLocalStorage));
}

clearButton.addEventListener('click',clearing)


completeButton.addEventListener('click',completed)

activeButton.addEventListener('click', all);

function updateElementCount() {
    const total = container.querySelectorAll('.card').length;
    const checked = container.querySelectorAll('.card.checked').length;
    numberOfElem.textContent = `${total - checked} items left`;
}

function displayData() {
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    cards.forEach(text => createCard(text));
    updateElementCount();
}

function saveToLocalStorage(text) {
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    cards.push(text);
    localStorage.setItem('cards', JSON.stringify(cards));
}

displayData();
