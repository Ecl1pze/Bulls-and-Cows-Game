const MAX_LENGTH = 4;
const RANGE = [0, 9];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createingCombinaton(length, range) {
  const uniqueInt = new Set();
  let combination = '';

  while (uniqueInt.size < length) {
    let template = getRandomInt(range[0], range[1]);

    if (!uniqueInt.has(template)) {
      uniqueInt.add(template);
      combination += template;
    } else continue;
  }

  return combination;
}

const compCombination = createingCombinaton(MAX_LENGTH, RANGE);
console.log(compCombination);

let countStep = 1;

document.querySelector('.game-button').addEventListener('click', function () {
  const userComb = document.querySelector('.game-input').value;
  const steps = document.querySelector('.steps');
  const stepBox = document.createElement('div');
  let step = handlerCombination(userComb, compCombination);
  stepBox.innerHTML = `<p class="step">${countStep}-й ход: ${userComb}. ${handlerMap(
    step
  )}</p>`;
  steps.append(stepBox);
  isVictory(step);
  countStep++;
});

function handlerMap(map) {
  const result = [];

  for (let [key, value] of map) {
    result.push(`${key}: ${value}`);
  }

  return result.join(', ');
}

function handlerCombination(userComb, compComb) {
  const map = new Map([
    ['Бык', 0],
    ['Корова', 0],
  ]);

  for (let i of compComb) {
    let posUser = userComb.indexOf(i);
    let posComp = compComb.indexOf(i);

    if (posUser == -1) continue;

    if (posComp == posUser) {
      map.set('Бык', map.get('Бык') + 1);
    } else {
      map.set('Корова', map.get('Корова') + 1);
    }
  }

  return map;
}

function isVictory(map) {
  if (map.get('Бык') == 4) {
    const button = document.querySelector('.game-button');
    const exodus = document.querySelector('.exodus');
    exodus.classList.add('exodus_win');
    button.textContent = 'Новая игра';
    button.addEventListener('click', function (e) {
      location.reload();
    });
  }
}
