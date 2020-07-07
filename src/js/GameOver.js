import React from "react";
import gameState from "./gameState";
import { view } from "react-easy-state";
import { Animate } from "react-show";
import { logScoreRecords, addRecord as postRecord } from "./helpers/recordStore.js";

class GameOver extends React.Component {
  state = {
    show: true,
  };
  
  closeGameOverWindowAndSetGameState = (currentLevelForRetry = '') => {
    this.setState({
      show: !this.state.show,
    });
    console.log('level in game Over State:', currentLevelForRetry);
    
    setTimeout(() => {
      gameState.choosenLevel = currentLevelForRetry;
      gameState.gameOver = false;

      gameState.timeScore = "";
      gameState.moves = "";
    }, 1500);
  }

  handleTryAgain = () => {
    this.closeGameOverWindowAndSetGameState(gameState.choosenLevel);
    this.props.retryLevel();
    console.log("%c RESTART HIT! ", "background: #222; color: #bada55");
  };

  handleMenuClick = () => {
    this.closeGameOverWindowAndSetGameState();
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {  //user hits Enter
      const currentDate = new Date().toJSON();  
      const userScore = {
          playerName: e.target.value,
          moves: gameState.moves,
          timeScore: gameState.timeScore,
          date: `${currentDate.slice(0,10)}  ${currentDate.slice(11,19)}`
      }
      postRecord(userScore);
      logScoreRecords();
      e.target.value = '';
    }
  };


  render() {
    const gameOverField = (
      <div>
        <div className="game-over-field">
          <div className="game-over-text">Game Over</div>
          <div className="score">
            Your Score: {gameState.timeScore} <br /> Moves: {gameState.moves}
          </div>
          <div>
            Your name: <input type="text" onKeyDown={this.handleKeyDown} />
          </div>
          <div className="game-over-btns">
            <div
              onClick={this.handleMenuClick}
              className="return-btn return-game-over-btn"
            />
            <div onClick={this.handleTryAgain} className="play-again-btn" />
          </div>
        </div>
      </div>
    );

    return (
      <div className="game-over">
        <Animate
          show={this.state.show}
          transitionOnMount
          duration={2000}
          style={{ height: "auto"}}
          start={{ opacity: 0, }}
          enter={{ opacity: 1}}
          leave={{ opacity: 0}}
        >
          {gameOverField}
        </Animate>
      </div>
    );
  }
}

export default view(GameOver);
