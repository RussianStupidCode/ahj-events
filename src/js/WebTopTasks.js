import TASK_STATES from './core/task_state';
import TopTasks from './core/TopTasks';

export default class WebTopTasks extends TopTasks {
  constructor(TaskClass) {
    super(TaskClass);

    this.el = document.createElement('div');
    this.el.classList.add('tasks');

    const title = document.createElement('span');
    title.textContent = 'TOP Tasks';

    this.errorMessage = document.createElement('span');
    this.errorMessage.classList.add('error-message', 'hide');

    this.el.insertAdjacentElement('beforeEnd', title);

    this.inputBlock = WebTopTasks.createInputBlock();
    this.pinnedTasks = WebTopTasks.createTaskListBlock(
      'Pinned: ',
      'No pinned tasks'
    );
    this.unpinnedTasks = WebTopTasks.createTaskListBlock(
      'All Tasks: ',
      'No tasks found'
    );

    this.el.insertAdjacentElement('beforeEnd', this.inputBlock);
    this.el.insertAdjacentElement('beforeEnd', this.errorMessage);
    this.el.insertAdjacentElement('beforeEnd', this.pinnedTasks);
    this.el.insertAdjacentElement('beforeEnd', this.unpinnedTasks);

    this.setListeners();
  }

  static createInputBlock() {
    const inputBlock = document.createElement('div');
    inputBlock.classList.add('tasks-block');

    const input = document.createElement('input');
    inputBlock.insertAdjacentElement('beforeEnd', input);

    return inputBlock;
  }

  static createTaskListBlock(labelName, emptyMessage) {
    const block = document.createElement('div');
    block.classList.add('tasks-block');

    const label = document.createElement('label');
    label.textContent = labelName;

    const tasks = document.createElement('div');
    tasks.classList.add('task-list');

    const emptyMessageEl = document.createElement('span');
    emptyMessageEl.classList.add('tasks-block-empty-msg');
    emptyMessageEl.textContent = emptyMessage;

    block.insertAdjacentElement('beforeEnd', label);
    block.insertAdjacentElement('beforeEnd', emptyMessageEl);
    block.insertAdjacentElement('beforeEnd', tasks);

    return block;
  }

  setListeners() {
    const input = this.inputBlock.querySelector('input');

    this.el.addEventListener('keypress', (event) => {
      const taskName = input.value.trim();

      if (event.key !== 'Enter') {
        return;
      }

      if (taskName.length === 0) {
        this.showError('Empty task name', 3000);
        return;
      }

      this.addTask(taskName);
      input.value = '';
    });

    this.el.addEventListener('click', (event) => {
      const { target } = event;

      const stateBlock = target.closest('.task-state-block');

      if (!stateBlock) {
        return;
      }

      const task = stateBlock.closest('.task');

      this.changeTaskState(task.dataset.name);
      this.allRedraw();
    });

    input.addEventListener('input', () => {
      const taskName = input.value.trim();
      this.redrawTasksBlock(this.unpinnedTasks, TASK_STATES.unpinned, taskName);
    });
  }

  changeTaskState(taskName) {
    const task = this.tasks[taskName];

    let newState = task.state;

    switch (task.state) {
      case TASK_STATES.pinned:
        newState = TASK_STATES.unpinned;
        break;
      case TASK_STATES.unpinned:
        newState = TASK_STATES.pinned;
        break;
      default:
    }

    task.changeState(newState);
  }

  showError(message, duration) {
    this.errorMessage.classList.remove('hide');
    this.errorMessage.textContent = message;

    setTimeout(() => {
      this.errorMessage.classList.add('hide');
    }, duration);
  }

  redrawTasksBlock(taskBlock, taskState, filter = '') {
    const taskList = taskBlock.querySelector('.task-list');

    taskList.innerHTML = '';

    const tasks = this.getFilteredTasks(taskState, filter);
    const emptyMsg = taskBlock.querySelector('.tasks-block-empty-msg');

    if (Object.keys(tasks).length === 0) {
      emptyMsg.classList.remove('hide');
      return;
    }

    emptyMsg.classList.add('hide');

    Object.entries(tasks).forEach((entry) => {
      const task = entry[1];
      task.render(taskList);
    });
  }

  allRedraw() {
    const input = this.inputBlock.querySelector('input');
    const taskName = input.value.trim();

    this.redrawTasksBlock(this.unpinnedTasks, TASK_STATES.unpinned, taskName);
    this.redrawTasksBlock(this.pinnedTasks, TASK_STATES.pinned);
  }

  addTask(name) {
    if (name in this.tasks) {
      return;
    }

    super.addTask(name);

    this.redrawTasksBlock(this.unpinnedTasks, TASK_STATES.unpinned);
  }

  render(parentElement) {
    parentElement.insertAdjacentElement('beforeEnd', this.el);
  }
}
