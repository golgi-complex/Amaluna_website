"use strict"

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};

if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow');
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener("click", function (e) {
                menuArrow.parentElement.classList.toggle('_active');
            });
        }
    }

} else {
    document.body.classList.add('_pc');
}

//Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu){
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}

//Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset - document.querySelector('header').offsetHeight;
            
            if(iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

//Кнопка наверх
window.addEventListener('scroll', function () {
    var scroll = document.querySelector('.button-up');
    scroll.classList.toggle("active", window.scrollY > 500)
})
function scrollTopTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
};

//Модальное окно
function msg_remover() {
    let msg_list=document.getElementById('msg');
    msg_list.remove();
};

function lock_remover() {
    document.body.classList.remove('_alert')
};

const MsgClass = document.querySelectorAll('#msg');
if (MsgClass.length > 0) {
    document.body.classList.toggle('_alert');
    setTimeout(lock_remover, 1600);
    setTimeout(msg_remover, 1500);
};

//Оптимизация загрузки изображений
(() => {
    'use strict';
    const objects = document.getElementsByClassName('async-image');
    Array.from(objects).map((item) => {
        const img = new Image();
        img.src = item.dataset.src;
        img.onload = () => {
            item.classList.remove('async-image');
            return item.nodeName === 'IMG' ?
                item.src = item.dataset.src :
                item.style.backgroundImage = `url(${item.dataset.src})`;
        };
    });
})();
