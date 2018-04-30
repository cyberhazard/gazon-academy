const PriceSlide = function(){
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
