import React from "react";
import NavPanel from "./NavPanel";
import Board from "./Board";


//Render board game with choosen level
class Game extends React.Component {
    state = {
        levelChoosed: false,
        level:'',
    };

    handleNavClick = chosenLevel => {
        this.setState({
            levelChoosed: true,
            level: chosenLevel,
        });
        console.log(chosenLevel);
    };

    render() {
        const {levelChoosed, level} = this.state;
        let renderElement;

        // console.log(levelChoosed);
        if (!levelChoosed) {
            renderElement = <div>
                <h1 className='game_title'>The memory game</h1>
                <p className='choose_level'>choose level</p>
                <NavPanel levelChoosed={this.handleNavClick}/>
            </div>
        } else {
            renderElement = <Board level={level}/>
        }

        console.log(levelChoosed);

        return <div className="game_field">
            {renderElement}
            <div className='signature'>W.Opulski</div>
        </div>
    }
}

export default Game;