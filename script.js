const getGameInfo = () => JSON.parse(localStorage.getItem("game"));

const init = () => {
  document.querySelector("#btn-continue").computedStyleMap.display = game
    ? "grid"
    : "none";
};

init();
