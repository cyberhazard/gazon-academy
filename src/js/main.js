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
