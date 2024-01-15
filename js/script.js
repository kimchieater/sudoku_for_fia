const start_screen = document.querySelector("#start-screen");
const game_screen = document.querySelector("#game-screen");

const cells = document.querySelectorAll(".main-grid-cell");

const game_level = document.querySelector("#game-level");
const game_time = document.querySelector("#game-time");

let level_index = 0;
let level = CONSTANT.LEVEL[level_index];

let timer = null;
let seconds = 0;

let su = undefined;
let su_answer = undefined;
// ---------

const showTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

const clearSudoku = () => {};

const initSudoku = () => {
  //clear old sudoku
  clearSudoku();
  // generate sudoku puzzle
  su = sudokuGen(level);
  su_answer = [...su.question];

  console.table(su_answer);

  //show sudoku on div

  for (let i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
    let row = Math.floor(i / CONSTANT.GRID_SIZE);
    let col = i % CONSTANT.GRID_SIZE;

    cells[i].setAttribute("data-value", su.question[row][col]);

    if (su.question[row][col] !== 0) {
      cells[i].classList.add("filled");
      cells[i].innerHTML = su.question[row][col];
    }
  }
};

const startGame = () => {
  start_screen.classList.remove("active");
  game_screen.classList.add("active");

  game_level.innerHTML = CONSTANT.LEVEL_NAME[level_index];

  seconds = 0;
  showTime(seconds);

  seconds = timer = setInterval(() => {
    seconds = seconds + 1;
    game_time.innerHTML = showTime(seconds);
  }, 1000);
};

//add space for each 9 cells

const initGameGrid = () => {
  let index = 0;

  for (let i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
    let row = Math.floor(i / CONSTANT.GRID_SIZE);
    let col = i % CONSTANT.GRID_SIZE;
    if (row === 2 || row === 5) cells[index].style.marginBottom = "10px";
    if (col === 2 || col === 5) cells[index].style.marginRight = "10px";

    index++;
  }
};
//end add space for each 9 cells

// -------------------

// add button event

document.querySelector("#btn-play").addEventListener("click", () => {
  startGame();
  initSudoku();
});

document.querySelector("#btn-level").addEventListener("click", (e) => {
  level_index =
    level_index + 1 > CONSTANT.LEVEL.length - 1 ? 0 : level_index + 1;
  level = CONSTANT.LEVEL[level_index];
  e.target.innerHTML = CONSTANT.LEVEL_NAME[level_index];
});

const getGameInfo = () => JSON.parse(localStorage.getItem("game"));

// ------------------------------

const init = () => {
  const game = getGameInfo();

  document.querySelector("#btn-continue").style.display = game
    ? "grid"
    : "none";

  initGameGrid();
};

init();
