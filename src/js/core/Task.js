export default class Task {
  constructor(name, state) {
    this.name = name;
    this.state = state;
  }

  changeState(newState) {
    this.state = newState;
  }
}
