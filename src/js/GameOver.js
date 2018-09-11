import React from "react";
import gameState from "./gameState";

class GameOver extends React.Component {


    handleMenuClick =() =>{
        gameState.choosenLevel = "";
    };

    render() {
        return <div className="game-over">
            <div className="game-over-field">
                <div>Your Score: {gameState.timeScore} moves:{gameState.moves}</div>
                <div>Your name: <input type="text"/></div>
                <div onClick={this.handleMenuClick} className="menu-back-btn"><p>MENU</p></div>
            </div>
        </div>
    }
}

export default GameOver;