export default class Gallery {
  constructor(inputForm, CardListClass, CardClass) {
    this.el = document.createElement('div');
    this.el.classList.add('gallery');

    this.inputForm = inputForm;
    this.cardList = new CardListClass(CardClass);

    this.inputForm.render(this.el);
    this.cardList.render(this.el);

    this.inputForm.addInputLine('name', 'Название');
    this.inputForm.addInputLine('src', 'Ссылка на изображение');

    this.setListeners();
  }

  setListeners() {
    this.inputForm.addButtonListener(() => {
      const imageTitle = this.inputForm.getInputValue('name');
      const imageSource = this.inputForm.getInputValue('src');

      if (imageSource === '' || imageTitle === '') {
        this.inputForm.showErrorMessage('Empty field', 2000);
        return;
      }

      const img = document.createElement('img');
      img.setAttribute('src', imageSource);
      img.addEventListener('error', () => {
        this.inputForm.showErrorMessage('Uncorrect url', 2000);
      });

      img.addEventListener('load', () => {
        this.cardList.add(imageTitle, imageSource);
        this.inputForm.resetInputs();
      });
    });
  }

  render(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }
}
