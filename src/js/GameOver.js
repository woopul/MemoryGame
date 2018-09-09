import React from "react";
import gameState from "./gameState";

class GameOver extends React.Component {

    render() {
        return <div className="game-over">
            <div className="game-over-field">
                <div>Your Score: {gameState.timeScore} moves:{gameState.moves}</div>
                <div>Your name:</div>
                <input type="text"/>
            </div>
        </div>
    }
}

export default GameOver;