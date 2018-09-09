import {store} from 'react-easy-state';

const gameState = store({
    gameStart: false,
    gameOver: false,
});

export default gameState;