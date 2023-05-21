
let offerSliderPrev = document.querySelector('.offer__slider-prev')
let offerSliderNext = document.querySelector('.offer__slider-next')
let slides = document.querySelectorAll('.offer__slide')
let currentSlide = document.querySelector('.current')
let totalSlides = document.querySelector('.total')
let slideIndex = 0

function showSlides() {
    if (slideIndex > slides.length - 1) {
        slideIndex = 0
    }

    if (slideIndex < 0) {
        slideIndex = slides.length - 1
    }

    slides.forEach(el => el.classList.add('hide'))
    slides[slideIndex].classList.remove('hide')
    slides[slideIndex].classList.add('fade')
    currentSlide.innerHTML = slideIndex + 1
}

showSlides()
totalSlides.innerHTML = slides.length

offerSliderNext.onclick = () => {
    slideIndex++
    showSlides()
}

offerSliderPrev.onclick = () => {
    slideIndex--
    showSlides()
}

// Modal

let modalButtons = document.querySelectorAll('[data-modal]')
let modal = document.querySelector('.modal')
let closeModal = document.querySelector('[data-close]')

modalButtons.forEach(button => {
    button.onclick = ('click', () => {
        modal.classList.add('show')
        modal.classList.remove('hide')
        document.body.style.overflow = 'hidden'
    })
})

closeModal.onclick = ('click', () => {
    modal.classList.remove('show')
    modal.classList.add('hide')
    document.body.style.overflow = ''
})




// kartinki
let tabsc = document.querySelectorAll('.tabheader__item')
let tabsContent = document.querySelectorAll('.tabcontent')
let tabParent = document.querySelector('.tabheader__items')

function hideContent() {
    tabsContent.forEach((elem) => {
        elem.classList.add('hide')
        elem.classList.remove('show')
        elem.classList.remove('fade')
    })

    tabsc.forEach((item) => {
        item.classList.remove('tabheader__item_active')
    })
}
function showTabContent(i = 0) {
    tabsContent[i].classList.remove('hide')
    tabsContent[i].classList.add('show', 'fade')
    tabsc[i].classList.add('tabheader__item_active')
}

hideContent()
showTabContent(0)

tabsc.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        hideContent()
        showTabContent(index)
    })
})



// ADD

let modalOverlay = document.querySelector('.modal-overlay');
let modalCloseBtn = document.querySelector('.modal-close-btn');

modalCloseBtn.onclick = () => {
    modalOverlay.style.display = 'none'
}

// !RANDOM
let spanRromo = document.querySelector('.pr')
function getPromo() {
    let getRandomCharacter = (characters) => characters[Math.floor(Math.random() * characters.length)]

    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let numbers = '0123456789'
    let random = ''

    for (let i = 0; i < 4; i++) {
        random += getRandomCharacter(letters)
        random += getRandomCharacter(numbers)
    }
    return random;
}

let promo = getPromo()
console.log(promo)
spanRromo.innerHTML = promo


function showModalOnScroll() {

    if ((window.innerHeight + window.pageYOffset) >= document.documentElement.scrollHeight) {

        if (!document.querySelector('.modal-overlay.show')) {

            let modal = document.querySelector('.modal-overlay')

            modal.classList.add('show')
        }
    }
}

window.addEventListener('scroll', showModalOnScroll);


// --------------calculating------------
let genderBtns = document.querySelectorAll('#gender .calculating__choose-item')
let inputs = document.querySelectorAll('.calculating__choose_medium input')
let actBtns = document.querySelectorAll('.calculating__choose_big .calculating__choose-item')
let result_view = document.querySelector('#result')

let userData = {
    gender: "woman",
}

genderBtns.forEach(btn => {
    btn.onclick = () => {
        genderBtns.forEach(el => el.classList.remove('calculating__choose-item_active'))
        btn.classList.add('calculating__choose-item_active')
        let key = btn.getAttribute('data-g')

        userData.gender = key
    }
})

inputs.forEach(inp => {
    inp.onkeyup = () => {
        userData[inp.id] = inp.value
        inp.style.border = "none"
    }
})

actBtns.forEach(btn => {
    btn.onclick = () => {
        actBtns.forEach(el => el.classList.remove('calculating__choose-item_active'))
        btn.classList.add('calculating__choose-item_active')
        let coefficient = +btn.getAttribute('data-act')
        let result

        const { gender, weight, height, age } = userData

        let isError = false

        inputs.forEach(inp => {
            if (inp.value.length === 0) {
                inp.style.border = "2px solid red"
                isError = true
            }
        })

        if (isError) {
            return
        }

        if (gender === 'woman') {
            result = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);

        } else {
            result = 66.5 + (13.75 * weight) + (5.003 * height) - (6.775 * age);
        }
        result_view.innerHTML = Math.floor(result * coefficient)


    }
})

// !--------------DEADLINE-------------

let deadline = "2023-05-31 00:00"


function getRemainingTime(endTime) {
    let t = Date.parse(endTime) - Date.parse(new Date()),
        days = Math.floor((t / 1000) / 60 / 60 / 24),
        hours = Math.floor((t / 1000) / 60 / 60 % 24),
        minutes = Math.floor((t / 1000) / 60 % 60),
        seconds = Math.floor((t / 1000) % 60);

    return {
        t,
        days,
        hours,
        minutes,
        seconds,
    }
}

function setTime(endTime, selector) {
    let t = document.querySelector(selector),
        days = t.querySelector('#days'),
        hours = t.querySelector('#hours'),
        minutes = t.querySelector('#minutes'),
        seconds = t.querySelector('#seconds'),
        interval = setInterval(updateTime, 1000);

    function updateTime() {
        let t = getRemainingTime(endTime)
        days.innerHTML = t.days
        hours.innerHTML = t.hours
        minutes.innerHTML = t.minutes
        seconds.innerHTML = t.seconds

        if (t.t <= 0) {
            clearInterval(interval)
        }
    }
}

setTime(deadline, '.timer')

// --------
let clients = []

// function showpModal  ()  {
//     let pModal = document.getElementById('pModal')
//     pModal.classList.add('show')
//     pModal.classList.add('fade')


//     setTimeout(() => {

//     pModal.classList.add('show')
//     pModal.classList.remove('fade')
//     }, 4000)
//   }


let allform = document.querySelectorAll('.modal__content form, .order__form')

allform.forEach((form) => {
    form.addEventListener('submit', (el) => {
        el.preventDefault()

        let name = form.querySelector('input[name="name"]').value.trim()
        let phone = form.querySelector('input[name="phone"]').value.trim()

        let estTakoyUser = clients.find((client) => client.name === name)
        // let m = document.querySelector('.p_modal')
        // let pn = document.querySelector('.p_text_name')
        // let pf = document.querySelector('.p_text_phone')

        if (estTakoyUser) {
            //   console.log('Есть такой пользователь');
            alert('Вы уже у нас в списке');
        } else {
            let newUser = { name, phone }
            clients.push(newUser)
            console.log('Новый пользователь:', newUser)

            // document.querySelector('.p_text_name').textContent = 'Пользователь: ' + name
            // document.querySelector('.p_text_phone').textContent = 'Мы перезвоним на номер: ' + phone
            // showModal();
            alert(`            Пользователь: ${name} 
            Мы перезвоним на номер: ${phone} 
            Спасибо за заказ!`)
        }
        name.value = ''
        phone.value = ''
    })
})
// !+++++++++++++++++++++









// deadline

// let count = new Date("May 31, 2023 00:00:00").getTime()

// setInterval(() => {
//   let time = count - new Date().getTime()

//   let days = Math.floor(time / (1000 * 60 * 60 * 24))
//   let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
//   let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
//   let seconds = Math.floor((time % (1000 * 60)) / 1000)

//   document.querySelector("#days").innerHTML = days
//   document.querySelector("#hours").innerHTML = hours
//   document.querySelector("#minutes").innerHTML = minutes
//   document.querySelector("#seconds").innerHTML = seconds

//   if (time < 0) {
//     clearInterval(countdown)
//     document.querySelector("#timer").innerHTML = "Отсчет завершен"
//   }
// }, 1000);


// restartForm



















