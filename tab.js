function tabs(tabsSelector, tabsParent, tabContentSelector, tabActiveClass) {
  const tabsContent = document.querySelectorAll(tabContentSelector),
        tabs = document.querySelectorAll(tabsSelector),
        tabsContainer = document.querySelector(tabsParent);

  const hideTabContent = () => {
    tabsContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show');
    });
    tabs.forEach((item) => {
      item.classList.remove(tabActiveClass);
    });
  };
  const showTabContent = (i = 0) => {
    tabsContent[i].classList.add('show');
    tabsContent[i].classList.remove('hide');

    tabs[i].classList.add(tabActiveClass);
  }
  hideTabContent();
  showTabContent();

  tabsContainer.addEventListener('click', (evt) => {
    const target = evt.target;
    if(target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (item === target) {
          hideTabContent();
          showTabContent(i);
        }
      })
    }
  });
};

export default tabs;
