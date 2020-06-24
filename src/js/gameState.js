import { store } from "react-easy-state";

const gameState = store({
  choosenLevel: "",

  gameOver: true,

  timeScore: "",
  moves: "",
});

export default gameState;
