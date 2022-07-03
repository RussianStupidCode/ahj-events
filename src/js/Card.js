import CLOSE_IMG from '../img/close.png';

export default class Card {
  constructor(title, imageSource) {
    this.el = document.createElement('div');
    this.el.classList.add('gallery-card');

    this.el.dataset.title = title;

    const cardTitle = document.createElement('span');
    cardTitle.textContent = title;

    const image = document.createElement('img');
    image.setAttribute('src', imageSource);
    image.classList.add('gallery-img');

    const closeButton = document.createElement('div');
    closeButton.classList.add('card-close-button');

    closeButton.innerHTML = `<img src="${CLOSE_IMG}" class="close-img">`;

    this.el.insertAdjacentElement('beforeEnd', cardTitle);
    this.el.insertAdjacentElement('beforeEnd', image);
    this.el.insertAdjacentElement('beforeEnd', closeButton);
  }

  remove() {
    this.el.remove();
  }

  render(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }

  get title() {
    return this.el.dataset.title;
  }
}
