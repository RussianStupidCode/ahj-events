export default class CardList {
  constructor(CardClass) {
    this.el = document.createElement('div');
    this.el.classList.add('gallery-card-list');

    this.CardClass = CardClass;

    this.cards = {};

    this.setListeners();
  }

  setListeners() {
    this.el.addEventListener('click', (event) => {
      const { target } = event;
      const closeButton = target.closest('.card-close-button');

      const card = target.closest('.gallery-card');

      if (closeButton) {
        this.removeCard(card.dataset.title);
      }
    });
  }

  add(title, src) {
    if (title in this.cards) {
      return;
    }

    const card = new this.CardClass(title, src);
    this.cards[title] = card;

    card.render(this.el);
  }

  removeCard(title) {
    const card = this.cards[title];

    if (card) {
      card.remove();
      delete this.cards[title];
    }
  }

  render(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }
}
