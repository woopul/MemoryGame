import React from "react";
import Card from "./Card";


//Generate board of cards depends of a level from props
class Board extends React.Component {
    state = {
        moves: 0,
        isFlipped: false,           // stores information if card was clicked
        firstClickedId: '',         // stores index of first clicked card
        numOfCardPairsToGenerate:0,   // depends of level ( 6, 8, 15);

        level: this.props.level,

        cards: [],                  // contain objects with generated card properties
        guessedCardsList: [],           // stores list of card indexes which were match
        temporaryFlippedCards: [],  // stores list of temp flipped cards (max 2)
    };

    //list of card imagaes used later with generating images
    easyImgSrcsTest = ["css3.svg", "angular.svg", "aurelia.svg", "backbone.svg", "ember.svg",
        "js-badge.svg", "vue.svg", "pinguin.svg", "nodejs2.svg", "visual-basic.svg"];

    // easyImgSrcs = ["css3.svg", "angular.svg", "aurelia.svg", "backbone.svg", "ember.svg",
    //     "js-badge.svg", "vue.svg", "pinguin.svg", "nodejs2.svg", "visual-basic.svg"];
    easyImgSrcs = [];
    mediumImgSrcs = [];
    hardImgSrcs = [];


    //generate and asign cards || generating table of source images for medium and hard level
    componentDidMount() {


        //put img sources of card itno the table
        for (let i = 1; i <= 50; i++) {
            const mediumSrc = `../../pictures/medium/(${i}).svg`;
            this.mediumImgSrcs.push(mediumSrc);

            const hardSrc = `../../pictures/hard/(${i}).svg`;
            this.hardImgSrcs.push(hardSrc);

        }

        this.easyImgSrcs = this.easyImgSrcsTest.map(src =>{
            return `../../pictures/${src}`
        });

        this.setState({
            cards: this.generateCards(this.props.level)
        });
    }


    //1st click - asign id of clicked card to temp var in state | change var isFlipped on true
    //2st click - check if id of second card is the same as first one
    //if true - save this id in the array of guessedId's - make further click on them not possible
    //at the end reset tempCardValue and isFlipped parameter
    handleCardClick = (currClickId, key) => {
        const {guessedCardsList, firstClickedId, isFlipped, temporaryFlippedCards, moves} = this.state;

        this.setState({
            moves: moves + 1,
        });

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
                    guessedCardsList: [...guessedCardsList, currClickId],
                });
                console.log("TRAFIONE!!");
            }

            if (temporaryFlippedCards.length < 2) {
                this.setState({
                    temporaryFlippedCards: [...temporaryFlippedCards, key],
                });
            }

            setTimeout(() => {
                this.resetTempValues();
            }, 600)

        }
    };

    resetTempValues = () => {
        this.setState({
            firstClickedId: "",
            isFlipped: false,
            temporaryFlippedCards: [],
        });
    };

    //Generate and shuffle cards
    generateCards = level => {
        let numOfCardPairsToGenerate;
        let maxValueToIterate;
        let imgSourceList;

        let cardsArr = [];
        let randomGenerated = [];

        // level='easy';
        //depends of level sets parameters
        switch (level) {
            case 'easy':
                numOfCardPairsToGenerate = 6;
                maxValueToIterate = this.easyImgSrcs.length;
                imgSourceList = this.easyImgSrcs;

                this.setState({
                    numOfCardPairsToGenerate: 6,
                });
                break;

            case 'medium':
                numOfCardPairsToGenerate = 6;
                maxValueToIterate = this.mediumImgSrcs.length;
                imgSourceList = this.mediumImgSrcs;

                this.setState({
                    numOfCardPairsToGenerate: 6,
                });
                break;

            case 'hard':
                numOfCardPairsToGenerate = 6;
                maxValueToIterate = this.hardImgSrcs.length;
                imgSourceList = this.hardImgSrcs;

                this.setState({
                    numOfCardPairsToGenerate: 6,
                });
                break;
        }

        console.log(numOfCardPairsToGenerate);
        console.log(maxValueToIterate);
        // console.log(imgSourceList);


        //----------------------GENERATING CARDS ------------------------------
        for (let i = 0; i < numOfCardPairsToGenerate; i++) {
            let randomNum;

            // select ( 6 || 10 || 15) different random nums, where max value is max pic arr value
            do {
                randomNum = Math.floor(Math.random() * (maxValueToIterate - 1) + 1)
            } while (randomGenerated.indexOf(randomNum) >=0 );

            console.log(randomNum)
            console.log(maxValueToIterate)

            randomGenerated.push(randomNum);

            const card = {
                id: i,
                imgSource: imgSourceList[randomNum],
            };

            cardsArr = [...cardsArr, card, card];
        }

        console.log(cardsArr);
        this.shuffle(cardsArr);

        return cardsArr;
    };

    shuffle = cardList => {
        for (let i = cardList.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [cardList[i - 1], cardList[j]] = [cardList[j], cardList[i - 1]];
        }
    };

    //flip clicked card if its id is on the list on temporary flipped
    flipCard = cardKey => {
        const {temporaryFlippedCards} = this.state;

        const className = temporaryFlippedCards.indexOf(cardKey) >= 0 ? 'card flip' : 'card';

        return className;
    }

    //check if current genereted card id is on the list of guessed
    isGuessed = cardId => {
        const isGuessed = this.state.guessedCardsList.indexOf(cardId) >= 0;
        return isGuessed;
    };

    render() {

        //create all of cards based on genereted before cards parameters array
        const cardList = this.state.cards.map((card, index) => {

            //check if this card has flipped pair
            const isGuessed = this.isGuessed(card.id);

            //set flip state depends of if it's guessed, flipped or not flipped
            const className = isGuessed ? 'card flip' : this.flipCard(index);

            return <Card cardClicked={this.handleCardClick}
                         key={index}
                         index={index}
                         id={card.id}
                         level={this.props.level}
                         matched={isGuessed}
                         className={className}
                         imgSrc={card.imgSource}/>
        });


        const {guessedCardsList, numOfCardPairsToGenerate} = this.state;
        //if number of guessed pairs is equal to number of pairs to generate GAME OVER
        if (guessedCardsList.length === numOfCardPairsToGenerate) {
            console.log('gameOver');
            console.log(this.state.moves);
        }

        return <section className="board">
            {cardList}
        </section>
    }
}


export default Board