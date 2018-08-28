import React from 'react'
import '../scss/main.scss'

import reactLogo from '../images/react-logo.png'

class LevelButton extends React.Component {

    handleClick = level => {
        console.log(level);
    }

    render() {
        const {level} = this.props;
        return <div onClick={e => this.handleClick({level})} className="nav_button"><span>{level.toUpperCase()}</span>
        </div>
    }
}


class Board extends React.Component {

    state = {
        level: "easy",
        filledCards: [],
        cardsToShow: [],
        indexToShow: [],
        cardsInRow: 0,
    };


    //choose image for a card depends on number in a row
    genCards = cardsNum => {

        let filledCards = [];
        let blankCards = [];

        for (let i = 0; i < cardsNum; i++) {
            const card = i;
            filledCards = [...filledCards, card, card];
            blankCards = [...blankCards, "?"];
        }


        this.shuffle(filledCards);

        this.setState({
            filledCards: filledCards,
            cardsToShow: blankCards,
        })
    }

    shuffle = cardList => {
        for (let i = cardList.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [cardList[i - 1], cardList[j]] = [cardList[j], cardList[i - 1]];
        }
    };

    handleClick = index => {
        const {indexToShow, cardsToShow, filledCards} = this.state;

        let tempCards = [...cardsToShow];
        tempCards[index] = filledCards[index];

        
        this.setState({
            cardsToShow: tempCards,

        })
        console.log(indexToShow);
    };


    componentDidMount() {
        const {level} = this.state;
        let cardsToGenerate;

        switch (level) {
            case "easy":
                cardsToGenerate = 18;
                this.setState({
                    cardsInRow: 6,
                });
                break;

            case "medium":
                cardsToGenerate = 32;
                this.setState({
                    cardsInRow: 8,
                });
                break;

            case "hard":
                cardsToGenerate = 50;
                this.setState({
                    cardsInRow: 10,
                });
                break;
        }
        this.genCards(cardsToGenerate);
    }

    render() {
        const {cardsInRow, cardsToShow} = this.state;

        const cardStyle = {
            width: `${100 / cardsInRow}%`,
            height: `${100 / cardsInRow}%`,
            background: "grey",
        }

        const cardList = this.state.cardsToShow.map((card, index) => {
            return <div style={cardStyle} onClick={e => this.handleClick(index)} className="card"
                        key={index}>{card}</div>
        });

        console.log(cardList);
        return <div className="board">
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
            <NavPanel/>
            <Board/>
        </div>
    }
}


class App extends React.Component {

    render() {
        // this.particle();
        return (
            <Game/>
        );
    }
}

export default App
