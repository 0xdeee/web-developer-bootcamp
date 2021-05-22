const p1 = {
  score: 0,
  button: document.querySelector('#player1ScoreBtn'),
  display: document.querySelector('#score1'),
};
const p2 = {
  score: 0,
  button: document.querySelector('#player2ScoreBtn'),
  display: document.querySelector('#score2'),
};
const matchType = {
  singles: document.querySelector('#singlesType'),
  doubles: document.querySelector('#doublesType'),
};
const resetButton = document.querySelector('#resetBtn');

let currentMatchType = '';

matchType.singles.addEventListener('click', () => {
  if (matchType.singles.checked) {
    currentMatchType = matchType.singles.value;
    p1.button.disabled = false;
    p1.button.textContent = '+1 Player 1';
    p2.button.disabled = false;
    p2.button.textContent = '+1 Player 2';
  }
});

matchType.doubles.addEventListener('click', () => {
  if (matchType.doubles.checked) {
    currentMatchType = matchType.doubles.value;
    p1.button.disabled = false;
    p1.button.textContent = '+1 Team 1';
    p2.button.disabled = false;
    p2.button.textContent = '+1 Team 2';
  }
});

p1.button.addEventListener('click', () => {
  updateScore(p1, p2);
});

p2.button.addEventListener('click', () => {
  updateScore(p2, p1);
});

updateScore = (player, opponent) => {
  player.score++;
  if (player.score === 21 && opponent.score < 20) {
    player.display.classList.add('has-text-success');
    opponent.display.classList.add('has-text-danger');
    player.button.disabled = true;
    opponent.button.disabled = true;
  } else if (
    (player.score > 21 || opponent.score > 21) &&
    player.score - opponent.score === 2
  ) {
    player.display.classList.add('has-text-success');
    opponent.display.classList.add('has-text-danger');
    player.button.disabled = true;
    opponent.button.disabled = true;
  } else if (
    (player.score > 21 || opponent.score > 21) &&
    player.score - opponent.score === -2
  ) {
    opponent.display.classList.add('has-text-success');
    player.display.classList.add('has-text-danger');
    player.button.disabled = true;
    opponent.button.disabled = true;
  }
  player.display.textContent = player.score;
};

const reset = () => {
  [p1, p2].forEach((p) => {
    p.score = 0;
    p.display.textContent = 0;
    p.display.classList.remove('has-text-success', 'has-text-danger');
    p.button.disabled = false;
  });
};

resetButton.addEventListener('click', reset);
