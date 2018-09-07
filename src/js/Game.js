import React from "react";
import NavPanel from "./NavPanel";
import Board from "./Board";


//Render board game with choosen level
class Game extends React.Component {
    state = {
        isLevelChoosed: false,
        level:'',
    };

    handleReturn = () => {
        this.setState({
            isLevelChoosed: false
        })
    }

    handleNavClick = chosenLevel => {
        this.setState({
            isLevelChoosed: true,
            level: chosenLevel,
        });
        console.log(chosenLevel);
    };

    handleStartGame = state =>{
        if(state){

        }
    }

    render() {
        const {isLevelChoosed, level} = this.state;
        let renderElement;

        // console.log(isLevelChoosed);
        if (!isLevelChoosed) {
            renderElement = <div>
                <h1 className='game_title'>The memory game</h1>
                <p className='choose_level'>choose level</p>
                <NavPanel isLevelChoosed={this.handleNavClick}/>
            </div>
        } else {
            renderElement = <div>
                <h1>00:</h1>
                <div className='return-btn' onClick={this.handleReturn}></div>
                <Board isGameStared = {this.handleStartGame} level={level}/>
            </div>
        }

        console.log(isLevelChoosed);

        return <div className="game_field">
            {renderElement}
            <div className='signature'>W.Opulski</div>
        </div>
    }
}

export default Game;