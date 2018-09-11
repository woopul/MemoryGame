import {store} from 'react-easy-state';

const gameState = store({
    choosenLevel:"",

    gameStart: false,
    gameOver: false,

    timeScore:"",
    moves:"",
});

export default gameState;