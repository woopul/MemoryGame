import React from "react";
import NavPanel from "./NavPanel";
import Board from "./Board";


//Render board game with choosen level
class Game extends React.Component {
    state = {
        isLevelChoosed: false,
        level:'',
    };

    handleNavClick = chosenLevel => {
        this.setState({
            isLevelChoosed: true,
            level: chosenLevel,
        });
        console.log(chosenLevel);
    };

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
            renderElement = <Board level={level}/>
        }

        console.log(isLevelChoosed);

        return <div className="game_field">
            {renderElement}
            <div className='signature'>W.Opulski</div>
        </div>
    }
}

export default Game;