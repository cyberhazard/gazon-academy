var sendMail = function sendMail(selector) {
  return fetch('/mail.php', {
    method: 'POST',
    body: new FormData(selector)
  }).catch(function (error) {
    alertify.error("Ошибка. Повторите отправку позже");
  });
};


const PriceSlide = function(){
  if(!document.querySelector('.Price__item')) return null
  const wrapper = document.querySelectorAll('.Price__item');
  const header = document.querySelector('.Price__item .Price__heading');
  const height = header.clientHeight;
  wrapper.forEach(e => {
    e.style.height = height + 'px';
    e.onclick = () => {
      if(e.classList.contains('Price__item_active')) e.style.height = height + 'px';
      else e.style.height = e.scrollHeight + 'px';
      e.classList.toggle('Price__item_active');
    }
  })
}
PriceSlide();

const mails = function(){
  const allForms = [document.querySelector('.Contacts-form__right'),document.querySelector('.Main-contacts__form'),document.querySelector('.Callback__form'),document.querySelector('.Price__callback') ]
  const sendForm = (forms) => {
    forms.forEach(el=>{
      if(!el) return null
      el.onsubmit = e => {
        e.preventDefault()
        sendMail(el).then(alertify.success('Ваша заявка отправленна'), el.reset())
      }
    })
  }
  sendForm(allForms);
}
mails();

const findLink = function(){
  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++){
        arr2[i] = arr[i];
      }
        return arr2;
      } else {
        return Array.from(arr);
      }
  }
  [].concat(_toConsumableArray(document.querySelectorAll('.Navigation__link'))).forEach(function (li, i, arr) {
    li.classList.remove('Navigation__link_active');
    if(li.getAttribute('href') === location.pathname ) li.classList.add('Navigation__link_active');
  });
}
findLink();


const mobileMenu = () => {
  const hamburger = document.querySelector('.Mobile__hamburger');
  const close = document.querySelector('.Mob-menu__close');
  const menu = document.querySelector('.Mob-menu');
  const items = [...document.querySelectorAll('.Mob-menu__item')];
  items.forEach( el => el.onclick = () => menu.style.transform = '');
  hamburger.onclick = () => (menu.style.transform = 'translateX(-100%)', document.body.style.overflow='hidden')
  close.onclick = () => (menu.style.transform = '', document.body.style.overflow='')
}
mobileMenu()

const callbackPopup = () => {
  const popup = document.querySelector('.CallbackPopup');
  const triggerButton = document.querySelector('.Navigation__button');
  const callbackButtons = document.querySelectorAll('.About-rullon__button');
  const closeButton = document.querySelector('.CallbackPopup__close');
  const form = document.querySelector('.CallbackPopup__form');
  const checkbox = document.querySelector('.CallbackPopup__checkbox');


  const removeScroll = () => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = (innerWidth - document.body.clientWidth) + 'px';
  }

  const addScroll = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  const prevent = e => {
    e.preventDefault();
    if(!checkbox.checked){
      alert('Согласитесь с обработкой персональных данных')
    } else {
      fetch('/mail.php', {
        method: 'POST',
        body: new FormData(form)
      })
      .then(function() {
        closePopup(), alertify.success('Ваша заявка отправленна'), form.reset();
      })
      .catch(function (error) {
        alertify.error("Ошибка. Повторите отправку позже");
      });
    }
  }
  const openPopup = e => {
    popup.style.display = 'flex';
    removeScroll();
    window.addEventListener('keydown', listenKeys);
    setTimeout(() => popup.style.opacity = 1, 0)
  }

  const listenKeys = e => {
    if (e.keyCode === 27) {
      closePopup();
    }
  }

  const closePopup = e => {
    popup.style.opacity = '';
    popup.addEventListener('transitionend', function end() {
      form.reset();
      popup.style.display = '';
      popup.removeEventListener('transitionend', end)
      addScroll();
      window.removeEventListener('keydown', listenKeys);
    })
  }

  triggerButton.addEventListener('click', openPopup);
  callbackButtons.forEach(el=>{
    el.addEventListener('click', openPopup);
  })
  closeButton.addEventListener('click', closePopup);
  form.addEventListener('submit', prevent);

}
callbackPopup();

/*** Countdown *****/
const countdown = (function(){
  const clock = {
    root: document.querySelector('.Countdown'),
    units: {
      days: document.querySelector('.Countdown__number.days span'),
      hours: document.querySelector('.Countdown__number.hours span'),
      minutes: document.querySelector('.Countdown__number.minutes span'),
      seconds: document.querySelector('.Countdown__number.seconds span')
    },
  };

  const lZ = num => num.toString().length > 1 ? num : '0' + num


  return (date, cb) => {
    if (!clock.root) return null;
    const countDownDate = new Date(date).getTime();
    const x = setInterval(function() {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      cb && cb({days, hours, minutes, seconds}) === false && clearInterval(x);
      clock.units.days.textContent = lZ(days) + '.'
      clock.units.hours.textContent = lZ(hours) + '.'
      clock.units.minutes.textContent = lZ(minutes) + '.'
      clock.units.seconds.textContent = lZ(seconds) + '.'
      if (distance < 0) {
        clearInterval(x);
      }
    }, 1000);
  }
})()

countdown('May 10, 2018 00:00:00')
