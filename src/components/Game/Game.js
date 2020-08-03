import React from "react";
import NavPanel from "../NavPanel/NavPanel";
import Board from "../Board/Board";
import { view } from "react-easy-state";
import gameState from "../gameState";
import './Game.scss';

//Render board game with choosen level
class Game extends React.Component {
  handleReturn = () => {
    gameState.gameOver = false;
    gameState.choosenLevel = "";
  };

  showGameOverWindow = () => {
    gameState.gameOver = !gameState.gameOver;
  };

  render() {
    let renderElement;

    if (gameState.choosenLevel === "") {
      renderElement = (
        <div>
          <h1 className="game_title">The memory game</h1>
          <p className="choose_level">choose level</p>
          <NavPanel />
        </div>
      );
    } else {
      renderElement = (
        <div>
          <div className="return-btn" onClick={this.handleReturn} />
          <Board  level={gameState.choosenLevel} />
        </div>
      );
    }

    return (
      <div className="game_field">
        {renderElement}
        <div className="signature">W.Opulski</div>
        <div
          className="game-restart-hidden"
          onClick={this.showGameOverWindow}
        ></div>
      </div>
    );
  }
}
export default view(Game);
