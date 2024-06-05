const list = document.querySelector('.todoapp');
const down = document.querySelector('.fa-solid');
const input = document.querySelector('.new-todo');
const container = document.querySelector('.content');
const form = document.querySelector('.todoapp'); 
const numberOfElem = document.getElementById('numberOfElem')

function createCard(text) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = text;
    container.appendChild(card);
}

function displayData() {
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    cards.forEach(text => createCard(text));
}

function createAnewRow(event) {
    event.preventDefault();
    const text = input.value.trim();
    if (text) {
        createCard(text);
        input.value = '';
        const cards = JSON.parse(localStorage.getItem('cards')) || [];
        cards.push(text);
        localStorage.setItem('cards', JSON.stringify(cards));
    }
}

form.addEventListener('submit', createAnewRow);

displayData();

