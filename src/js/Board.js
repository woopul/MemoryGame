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
        if (isFlipped === false) {

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
            }


            if(temporaryFlippedCards.length <2){
                this.setState({
                    temporaryFlippedCards: [...temporaryFlippedCards, key],
                });
            }

            setTimeout(()=>{
                this.resetTempValues();
            }, 600)

            //reset values
           //
        }
    };

    resetTempValues = () =>{
        this.setState({
            firstClickedId: "",
            isFlipped: false,
            temporaryFlippedCards: [],
        });
    }

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
                imgSrcName: imgName,
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

    flipCard = cardKey => {
        const {temporaryFlippedCards} = this.state;

        const className = temporaryFlippedCards.indexOf(cardKey) >=0 ? 'card flip': 'card';

        return className;
    }

    isGuessed = cardId =>{
        const isGuessed = this.state.guessedCards.indexOf(cardId) >=0;
        return isGuessed;
    };

    render() {

        //create all of cards based on genereted before cards parameters array
        const cardList = this.state.cards.map((card, index) => {

            const isGuessed = this.isGuessed(card.id);

            const className = isGuessed ? 'card flip': this.flipCard(index);

            return <Card cardClicked={this.handleCardClick}
                         key={index}
                         index ={index}
                         id={card.id}
                         matched={isGuessed}
                         className = {className}
                         img={card.imgSrcName}/>
        });

        return <section className="board">
            {cardList}
        </section>
    }
}


export default Board