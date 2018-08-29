import React from "react";

class Board extends React.Component {
    state = {
        level: "easy",
        filledCards: [],
        cardsToShow: [],
        indexToShow: [],
        tempIndex:[],

        clickCount:0,
        cardsInRow: 0,
    };

    //fill first table with blank cards
    //fill another table with choosen images (numbers)
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

    //takes genereted table of cards and shuffle it
    shuffle = cardList => {
        for (let i = cardList.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [cardList[i - 1], cardList[j]] = [cardList[j], cardList[i - 1]];
        }
    };

    //show clicked card
    //if second is clicked, show both for 0.8s and then turn it back, if they are the same leave it visible
    handleClick = index => {

        const {indexToShow, cardsToShow, filledCards, clickCount, tempIndex} = this.state;

        let tempCards = [...cardsToShow];
        tempCards[index] = filledCards[index];

        if(clickCount === 0){
            this.setState({
                tempIndex: index,
                clickCount: clickCount +1,
                // cardsToShow:
            })
        } else {

        }


        if(currClickState ===2){
            this.setState({
                clickCount: 0,
            });
        }

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

export default Board