import React from "react";
import gameState from "./gameState";
import {view} from "react-easy-state";

class GameOver extends React.Component {


    handleTryAgain = () => {
        gameState.level = this.props.level;
        gameState.gameOver = false;

        gameState.timeScore = "";
        gameState.moves = "";
    };

    handleMenuClick = () => {

        gameState.choosenLevel = "";
        gameState.gameOver = false;

        gameState.timeScore = "";
        gameState.moves = "";
    };

    render() {
        return <div className="game-over">
            <div className="game-over-field">
                <div className="game-over-text">Game Over</div>
                <div className="score">
                    Your Score: {gameState.timeScore} <br/> Moves:{gameState.moves}
                </div>
                {/*<div>Your name: <input type="text"/></div>*/}
                <div className="game-over-btns">
                    <div onClick={this.handleMenuClick} className="menu-back-btn"/>
                    {/*<div onClick={this.handleTryAgain} className="menu-back-btn"><p>TRY AGAIN</p></div>*/}
                </div>
            </div>
        </div>
    }
}

export default view(GameOver);