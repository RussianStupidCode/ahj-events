export default class InputForm {
  constructor(buttonText) {
    this.el = document.createElement('div');
    this.el.classList.add('input-form');

    this.inputLines = {};

    this.inptuField = InputForm.createInputField();
    this.button = InputForm.createButton(buttonText);

    this.errorMessage = document.createElement('span');
    this.errorMessage.classList.add('error-message', 'hide');

    this.el.insertAdjacentElement('beforeEnd', this.inptuField);
    this.el.insertAdjacentElement('beforeEnd', this.errorMessage);
    this.el.insertAdjacentElement('beforeEnd', this.button);
  }

  static createInputLine(labelText) {
    const inputLine = document.createElement('div');
    inputLine.classList.add('input-line');

    const labelContainer = document.createElement('div');
    labelContainer.classList.add('input-label');

    const label = document.createElement('span');
    label.classList.add('input-line-label');
    label.textContent = labelText;

    labelContainer.insertAdjacentElement('beforeEnd', label);

    const input = document.createElement('input');

    inputLine.insertAdjacentElement('beforeEnd', labelContainer);
    inputLine.insertAdjacentElement('beforeEnd', input);

    return inputLine;
  }

  static createInputField() {
    const inptuField = document.createElement('div');
    inptuField.classList.add('input-field');

    return inptuField;
  }

  static createButton(buttonText) {
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('input-button');

    button.textContent = buttonText;

    return button;
  }

  addInputLine(name, labelText) {
    this.inputLines[name] = InputForm.createInputLine(labelText);
    this.inptuField.insertAdjacentElement('beforeEnd', this.inputLines[name]);
  }

  getInputValue(inputName) {
    const input = this.inputLines[inputName].querySelector('input');
    return input.value.trim();
  }

  resetInput(inputName) {
    const input = this.inputLines[inputName].querySelector('input');
    input.value = '';
  }

  resetInputs() {
    Object.keys(this.inputLines).forEach((name) => this.resetInput(name));
  }

  addButtonListener(callback) {
    this.button.addEventListener('click', callback);
  }

  showErrorMessage(message, duration) {
    this.errorMessage.classList.remove('hide');
    this.errorMessage.textContent = message;

    setTimeout(() => {
      this.errorMessage.classList.add('hide');
    }, duration);
  }

  render(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }
}
