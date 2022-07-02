export default class GameTableInfo {
  constructor() {
    this.el = document.createElement('div');
    this.el.classList.add('game-table-info');

    this.lines = {};
  }

  render(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }

  hide() {
    this.el.classList.add('hide');
  }

  show() {
    this.el.classList.remove('hide');
  }

  addLine(name, constantMessagePart) {
    const line = document.createElement('div');
    line.textContent = constantMessagePart;

    this.lines[name] = {
      constPart: constantMessagePart,
      htmlElement: line,
    };

    this.el.insertAdjacentElement('beforeEnd', line);
  }

  changeLineMessage(name, message) {
    const { htmlElement, constPart } = this.lines[name];

    htmlElement.textContent = `${constPart} ${message}`;
  }
}
