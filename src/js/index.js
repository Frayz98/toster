import customSelect from 'custom-select';

const productImages = document.querySelectorAll('.product__image img');
const productPreviews = document.querySelector('.product__previews');
const productPreviewsItems = document.querySelectorAll('.product__previews-item');
const oldPrice = document.querySelector('.hero__price-old span');
const newPrice = document.querySelector('.hero__price-new span');

const myOldPrice = 280,
    myNewPrice = 160;

oldPrice.innerHTML = myOldPrice.toFixed(2);
newPrice.innerHTML = myNewPrice.toFixed(2);

const colors = [
    {id: 0, color: 'black'},
    {id: 1, color: 'orange'},
    {id: 2, color: 'pink'},
    {id: 3, color: 'yellow'},
]

productPreviews.addEventListener('click', (e) => {
    const target = e.target.parentNode;
    if (target.className.includes("product__previews-item")) {
        const id = Number(target.getAttribute('data-id'))
        activePreview(id)
        setSelectValue(id)
    }
})

function hideProducts() {
    productImages.forEach(el => {
        el.classList.remove('active')
        el.classList.add('hidden')
    })
}

function activePreview(id = 0) {
    productPreviewsItems.forEach(el => {
        el.classList.remove('active');
    })

    hideProducts()
    productPreviewsItems[id].classList.add('active')
    showProductImg(id)
}
function showProductImg(id = 0) {
    productImages[id].classList.remove('hidden')
    productImages[id].classList.add('active')
}

activePreview()

customSelect('select')

const selectPanel = document.querySelectorAll('.custom-select-panel')

selectPanel[0].addEventListener('click', el => getValue(el))
selectPanel[1].addEventListener('click', el => getValue(el))

function getValue(el) {
    const target = el.target
    if (target.className.includes('custom-select-option')) {
        const color = target.getAttribute('data-value');
        colors.forEach(el => {
            if (el.color === color) {
                activePreview(el.id)
            }
        })
    }
}

function setSelectValue(id) {
    const selectOptions = document.querySelectorAll('.custom-select-option')
    const findItem = colors.find(item => item.id === id)
    selectOptions.forEach(el => {
        el.classList.remove('is-selected', 'has-focus')
        if (el.getAttribute('data-value') === findItem.color) {
            const select = document.querySelector('.custom-select-opener span')
            select.textContent = el.getAttribute('data-value')
            el.classList.add('is-active', 'has-focus')
        }
    })
}

const deadline = () => {
    let hours, minutes, seconds;

    const now = new Date()
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    const diff = tomorrow - now;
    if (diff <= 0) {
        hours = 0
        minutes = 0
        seconds = 0
    } else {
        hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
        minutes = Math.floor((diff / (1000 * 60)) % 60)
        seconds = Math.floor((diff / 1000) % 60)
    }

    return {
        diff,
        hours,
        minutes,
        seconds
    }
}

function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function setTimer(selector) {
    const timer = document.querySelector(selector),
        newHours = timer.querySelector('.hour span'),
        newMinutes = timer.querySelector('.minutes span'),
        newSeconds = timer.querySelector('.seconds span'),
        timerInterval = setInterval(updateTimer, 1000);

    updateTimer()

    function updateTimer() {
        const {diff, hours, minutes, seconds} = deadline()
        newHours.innerHTML = getZero(hours)
        newMinutes.innerHTML = getZero(minutes)
        newSeconds.innerHTML = getZero(seconds)

        if (diff <= 0) {
            clearInterval(timerInterval)
        }
    }
}

setTimer('.timer')
