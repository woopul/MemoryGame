import React from 'react'
import '../scss/main.scss'

import reactLogo from '../images/react-logo.png'


class LevelButton extends React.Component {

    render() {
        return <div className="nav_button"><span>{this.props.level.toLocaleUpperCase()}</span></div>
    }
}


class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [],
        }
    }

    //choose image for a card depends on number in a row
    genCards = cardsNum => {

        let cards = [];

        for (let i = 0; i<cardsNum; i++) {
            const card = i;
            cards = [...cards, card, card];
            // cards.push(card);
            // cards.push(card);
        }

        console.log(cards);

        this.shuffle(cards);

        this.setState({
            cards:cards,
        })
    }

    shuffle = cardList => {
        for (let i = cardList.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [cardList[i - 1], cardList[j]] = [cardList[j], cardList[i - 1]];
        }
    }

    handleClick = card =>{
        console.log(card);
    }

    componentDidMount() {
        this.genCards(18);
    }

    render() {

        const cardList = this.state.cards.map((card, index) =>{
            return <div onClick={e=> this.handleClick(card)} className="card" key={index}>{card}</div>
        });

        console.log(cardList);
        return <div  className="board">
            {cardList}
        </div>
    }
}

class NavPanel extends React.Component {

    render() {
        return <div className="nav_panel">
            <LevelButton level="easy"/>
            <LevelButton level="medium"/>
            <LevelButton level="hard"/>
        </div>
    }
}


class Game extends React.Component {

    render() {
        return <div className="game_field">
            <NavPanel />
            <Board />
        </div>
    }
}


class App extends React.Component {

    render() {
        // this.particle();
        return (
            <Game />
        );
    }
}

export default App
