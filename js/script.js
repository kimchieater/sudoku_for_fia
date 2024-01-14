const start_screen = document.querySelector("#start-screen");
const cells = document.querySelectorAll(".main-grid-cell");

let level_index = 0;
let level = CONSTANT.LEVEL[level_index];
// ---------

document.querySelector("#btn-level").addEventListener("click", (e) => {
  level_index =
    level_index + 1 > CONSTANT.LEVEL.length - 1 ? 0 : level_index + 1;
  level = CONSTANT.LEVEL[level_index];
  e.target.innerHTML = CONSTANT.LEVEL_NAME[level_index];
});

const getGameInfo = () => JSON.parse(localStorage.getItem("game"));

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

const init = () => {
  const game = getGameInfo();

  document.querySelector("#btn-continue").style.display = game
    ? "grid"
    : "none";

  initGameGrid();
};

init();
