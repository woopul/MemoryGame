import React from "react";
import Card from "./Card";



class Board extends React.Component {
    state = {
        cards: [],                  // contain objects with generated card properties
        isFlipped: false,           // stores information if card was clicked
        firstClickedId: '',         // stores index of first clicked card

        guessedCards: [],           // stores list of card indexes which were match
        temporaryFlippedCards:[],
    };

    //generate and asign cards
    componentDidMount() {
        this.setState({
            cards: this.generateCards(6)
        })
    }

    //list of card imagaes used later with generating images
    imgSrcs = ["angular", "aurelia", "backbone", "ember", "js-badge", "vue", "react"];


    //1st click - asign id of clicked card to temp var in state | change var isFlipped on true
    //2st click - check if id of second card is the same as first one
    //if true - save this id in the array of guessedId's - make further click on them not possible
    //at the end reset tempCardValue and isFlipped parameter
    handleCardClick = (currClickId, key) => {
        const {guessedCards, firstClickedId, isFlipped, temporaryFlippedCards} = this.state;

        //1st click
        if (!isFlipped) {
            this.setState({
                isFlipped: true,
                firstClickedId: currClickId,
                temporaryFlippedCards: [...temporaryFlippedCards, key],
            });

        } else {    //2nd click
            if (firstClickedId === currClickId) {
                this.setState({
                    guessedCards: [...guessedCards, currClickId],
                });
                console.log("TRAFIONE!!");
                this.setState({
                    temporaryFlippedCards: [...temporaryFlippedCards, key],
                })
            }

            //reset values
            this.setState({
                firstClickedId: "",
                isFlipped: false,
                temporaryFlippedCards: [],
            });
        }

        // console.log([...this.state]);
    };

    //Generate and shuffle cards
    generateCards = numToGenerate => {
        let cardsArr = [];

        //loop through array of image name srcs
        // generate card, make its copy
        // place it in the cards array
        for (let i = 0; i < numToGenerate; i++) {
            const imgName = this.imgSrcs[i];

            const card = {
                id: i,
                matched: false,
                imgSrcName: imgName
            };

            cardsArr = [...cardsArr, card, card];
        }

        this.shuffle(cardsArr);

        return cardsArr;
    };

    shuffle = cardList => {
        for (let i = cardList.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [cardList[i - 1], cardList[j]] = [cardList[j], cardList[i - 1]];
        }
    };


    render() {

        const {guessedCards, cards, temporaryFlippedCards} = this.state;

        //create all of cards based on genereted before cards parameters array
        const cardList = cards.map((card, index) => {

            let isGuessed = false;
            let unflip = false;
            const numOfTempFlipped = temporaryFlippedCards.length;

            //if this card's id is on the list of matched card's id's- set props isGuessed on true
            if (guessedCards.indexOf(card.id) >= 0) {
                isGuessed = true;
            }

            if(numOfTempFlipped === 2 && temporaryFlippedCards.indexOf(card.id) >= 0) {
                unflip = true;
            }

            return <Card cardClicked={this.handleCardClick}
                         key={index}
                         index ={index}
                         id={card.id}
                         matched={isGuessed}
                         flipBack ={unflip}
                         img={card.imgSrcName}/>
        });

        return <section className="board">
            {cardList}
        </section>
    }
}


export default Board