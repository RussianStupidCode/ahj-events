import Task from './core/Task';
import PINNED_IMG from '../img/pinned.png';
import TASK_STATES from './core/task_state';

export default class WebTask extends Task {
  constructor(name, state) {
    super(name, state);

    this.el = document.createElement('div');
    this.el.classList.add('task');
    this.el.dataset.name = name;

    const taskName = document.createElement('span');
    taskName.classList.add('task-name');
    taskName.textContent = name;

    const stateBlock = document.createElement('div');
    stateBlock.classList.add('task-state-block');

    const stateImg = document.createElement('img');
    stateImg.classList.add('task-state-img');
    stateImg.setAttribute('src', PINNED_IMG);
    stateImg.classList.add('hide');

    this.el.insertAdjacentElement('beforeEnd', taskName);
    this.el.insertAdjacentElement('beforeEnd', stateBlock);
    stateBlock.insertAdjacentElement('beforeEnd', stateImg);
  }

  changeState(newState) {
    super.changeState(newState);

    const stateImg = this.el.querySelector('.task-state-img');

    if (this.state === TASK_STATES.pinned) {
      stateImg.classList.remove('hide');
      return;
    }

    stateImg.classList.add('hide');
  }

  render(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }
}
