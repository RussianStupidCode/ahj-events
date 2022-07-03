import { filterObject } from '../utils';
import TASK_STATES from './task_state';

export default class TopTasks {
  constructor(TaskClass) {
    this.TaskClass = TaskClass;
    this.tasks = {};
  }

  addTask(name) {
    this.tasks[name] = new this.TaskClass(name, TASK_STATES.unpinned);
  }

  getFilteredTasks(state, filter = '') {
    const tasksInState = Object.fromEntries(
      Object.entries(this.tasks).filter((entry) => entry[1].state === state)
    );

    if (filter === '') {
      return tasksInState;
    }

    return filterObject(tasksInState, new RegExp(`^${filter}`, 'i'));
  }
}
