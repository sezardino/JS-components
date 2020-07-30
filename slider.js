function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCouner, wrapper, field}) {

  const sliderContainer = document.querySelector(container),
        sliderWrapper = document.querySelector(wrapper),
        sliderInner = sliderContainer.querySelector(field),
        slides = sliderContainer.querySelectorAll(slide),
        prev = sliderContainer.querySelector(prevArrow),
        next = sliderContainer.querySelector(nextArrow),
        total = sliderContainer.querySelector(totalCounter),
        current = sliderContainer.querySelector(currentCouner),
        width = window.getComputedStyle(sliderWrapper).width;
  let slideIndex = 1,
      offset = 0;

  current.textContent = `0${slideIndex}`;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
  } else {
    total.textContent = slides.length;
  }

  const checkIndex = (n) => {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    if (slides.length < 10) {
      current.textContent =  `0${slideIndex}`;
    } else {
        current.textContent =  slideIndex;
    }
  };

  sliderContainer.style.position = 'relative';

  const indicators = document.createElement('ol'),
  dots = [];

  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;
  sliderContainer.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;
    if (i === 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  sliderInner.style.width = 100 * slides.length + '%';
  sliderInner.style.display = 'flex';
  sliderWrapper.style.overflow = 'hidden';
  sliderInner.style.transition = '0.5s all';

  next.addEventListener('click', () => {
  offset += +width.slice(0, width.length - 2);

  if (offset == width.slice(0, width.length - 2) * slides.length) {
    offset = 0;
  }
  slideIndex += 1;
  checkIndex(slideIndex);
  sliderInner.style.transform = `translateX(-${offset}px)`;

  dots.forEach(dot => dot.style.opacity = '.5');
  dots[slideIndex -1].style.opacity = 1;
  });
  prev.addEventListener('click', () => {
    offset -= +width.slice(0, width.length - 2);
    if (offset < 0) {
      offset = width.slice(0, width.length - 2) * (slides.length - 1);
    }

    slideIndex -= 1;
    checkIndex(slideIndex);

    sliderInner.style.transform = `translateX(-${offset}px)`;

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', (evt) => {
      const slideTo = evt.target.getAttribute('data-slide-to');

    slideIndex = slideTo;
    offset = width.slice(0, width.length - 2) * (slideIndex - 1);
    sliderInner.style.transform = `translateX(-${offset}px)`;

    checkIndex(slideIndex);

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex -1].style.opacity = 1;
  });
  });
}

export default slider;
