import CELL_STATES from './core/cell_state';
import GameTableInfo from './GameTableInfo';
import { getRandomInteger } from './utils';

export default class GoblinGame {
  constructor(gameField) {
    this.el = document.createElement('div');
    this.el.classList.add('game');

    this.gameTableInfo = new GameTableInfo();

    this.goblinTimeInterval = 1000;
    this.maxGoblinCount = 5;

    this.gameInterval = null;

    this.gameField = gameField;
    this.state = {
      goblinCount: 0,
      success: 0,
    };

    this.activeCellPosition = null;
    this.setListeners();
  }

  static createEndGameMessage() {
    const endMessage = document.createElement('div');
    endMessage.classList.add('end-message');

    endMessage.textContent = 'Вы проиграли!!';
    return endMessage;
  }

  gameOver() {
    clearInterval(this.gameInterval);

    this.gameField.el.classList.add('hide');

    this.el.insertAdjacentElement(
      'beforEend',
      GoblinGame.createEndGameMessage()
    );
  }

  setListeners() {
    this.gameField.addClickListener((event) => {
      const { target } = event;

      const cell = target.closest('.cell');

      if (!cell) {
        return;
      }

      const position = {
        row: Number(cell.dataset.row),
        column: Number(cell.dataset.column),
      };

      const cellState = this.gameField.getCellState(position);

      if (cellState === CELL_STATES.target) {
        this.state.success += 1;
        this.state.goblinCount -= 1;

        this.gameTableInfo.changeLineMessage('points', this.state.success);
      }

      this.gameField.clickCell(position);
    });
  }

  render(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }

  start() {
    this.gameTableInfo.render(this.el);
    this.gameField.render(this.el);

    this.gameTableInfo.addLine('points', 'kill: ');
    this.gameTableInfo.changeLineMessage('points', this.state.success);

    this.gameInterval = setInterval(() => {
      const position = {
        row: getRandomInteger(0, this.gameField.rowCount),
        column: getRandomInteger(0, this.gameField.columnCount),
      };

      while (
        this.activeCellPosition &&
        position.row === this.activeCellPosition.row &&
        position.column === this.activeCellPosition.column
      ) {
        position.row = getRandomInteger(0, this.gameField.rowCount);
        position.column = getRandomInteger(0, this.gameField.columnCount);
      }

      this.state.goblinCount += 1;

      this.changeActiveCell(position);

      if (this.state.goblinCount > this.maxGoblinCount) {
        this.gameOver();
      }
    }, this.goblinTimeInterval);
  }

  changeActiveCell(newPosition) {
    if (this.activeCellPosition) {
      this.gameField.deactivate(this.activeCellPosition);
    }
    this.gameField.activate(newPosition);
    this.activeCellPosition = newPosition;
  }
}
