import Card from './Card';
import CardList from './CardList';
import Gallery from './Gallery';
import GoblinCell from './GoblinCell';
import GoblinGame from './GoblinGame';
import GoblinGameField from './GoblinGameField';
import InputForm from './InputForm';
import WebTask from './WebTask';
import WebTopTasks from './WebTopTasks';

function createGoblinControl() {
  const controls = document.querySelector('.controls');
  const taskField = document.querySelector('.task-field');

  const button = document.createElement('button');
  button.classList.add('control');
  button.textContent = 'Убийца гоблинов (#1)';
  controls.insertAdjacentElement('beforeEnd', button);

  button.addEventListener('click', () => {
    taskField.innerHTML = '';

    const gameField = new GoblinGameField(4, 4, GoblinCell);

    const game = new GoblinGame(gameField);

    game.render(taskField);

    game.start();
  });
}

function createTopTasksControl() {
  const controls = document.querySelector('.controls');
  const taskField = document.querySelector('.task-field');

  const button = document.createElement('button');
  button.classList.add('control');
  button.textContent = 'Top Tasks (#2)';
  controls.insertAdjacentElement('beforeEnd', button);

  button.addEventListener('click', () => {
    taskField.innerHTML = '';

    const topTasks = new WebTopTasks(WebTask);

    topTasks.render(taskField);
  });
}

function createGalleryControl() {
  const controls = document.querySelector('.controls');
  const taskField = document.querySelector('.task-field');

  const button = document.createElement('button');
  button.classList.add('control');
  button.textContent = 'Gallery (#3)';
  controls.insertAdjacentElement('beforeEnd', button);

  button.addEventListener('click', () => {
    taskField.innerHTML = '';

    const inputForm = new InputForm('Добавить');

    const gallery = new Gallery(inputForm, CardList, Card);

    gallery.render(taskField);
  });
}

function main() {
  createGoblinControl();
  createTopTasksControl();
  createGalleryControl();
}

main();
