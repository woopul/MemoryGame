import React from "react";
import FadeIn from "react-fade-in";
import Card from "../Card/Card";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import GameOver from "../GameOver/GameOver";
import { view } from "react-easy-state";
import gameState from "../gameState";
import { easyImgSrcs, mediumImgSrcs, hardImgSrcs } from "../svgs/easy";
import {levelSettings} from "../helpers/levelSettings";
import './Board.scss'

const DEFAULT_STATE = {
  isFlipped: false, // stores information if card was clicked
  firstClickedId: "", // stores index of first clicked card

  cards: [], // contain objects with generated card properties
  guessedCardsList: [], // stores list of card indexes which were match
  temporaryFlippedCards: [], // stores list of temp flipped cards (max 2)

  start: false,
  moves: 0,
};

class Board extends React.Component {
  state = { ...DEFAULT_STATE };

  reloadBoardOnTryAgain = () => {
    this.setState({
      ...DEFAULT_STATE,
      cards: this.generateCards(gameState.choosenLevel),
    });
  };

  componentDidMount() {
    this.setState(
      { cards: this.generateCards(gameState.choosenLevel),
        // loaded: true,
      });
    }
  //1st click - asign id of clicked card to temp var in state | change var isFlipped on true
  //2st click - check if id of second card is the same as first one
  //if true - save this id in the array of guessedId's - make further click on them not possible
  //at the end reset tempCardValue and isFlipped parameter
  handleCardClick = (currClickId, key) => {
    const {
      guessedCardsList,
      firstClickedId,
      isFlipped,
      temporaryFlippedCards,
    } = this.state;

    this.setState({
      start: true,
    });

    //1st click
    if (isFlipped === false) {
      //set state on that it is flipped, store flipped card id, stored flipped card key in the memomry
      this.setState({
        isFlipped: true,
        firstClickedId: currClickId,
        temporaryFlippedCards: [key],
      });
    } else {
      //2nd click
      //check if  flipped cards are the same
      if (firstClickedId === currClickId) {
        this.setState({
          guessedCardsList: [...guessedCardsList, currClickId],
          moves: this.state.moves + 1,
        });
      }

      if (temporaryFlippedCards.length < 2) {
        this.setState({
          temporaryFlippedCards: [...temporaryFlippedCards, key],
          moves: this.state.moves + 1,
        });
      }

      setTimeout(() => {
        this.resetTempValues();
      }, 400);
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
  generateCards = (level) => {
    let numOfCardPairsToGenerate = levelSettings[gameState.choosenLevel];
    let maxValueToIterate; // for loop which choose sources from these in the array depend of level
    let imgSourceList; // array of img sources, diffrent for each level

    let cardsArr = []; // array of card objects with {imgSrc, id}
    let randomGenerated = []; //arr of rundom generated numbs, for checking if chosen one were chosen before

    // levelSettings[level].numberCardsToGenerate;
    // level='easy';
    //depends of level sets parameters
    switch (level) {
      case "easy":
        numOfCardPairsToGenerate = 6;
        maxValueToIterate = easyImgSrcs.length;
        imgSourceList = easyImgSrcs;
        break;

      case "medium":
        numOfCardPairsToGenerate = 10;
        maxValueToIterate = mediumImgSrcs.length;
        imgSourceList = mediumImgSrcs;

        this.setState({
          numOfCardPairsToGenerate: 10,
          flippedClassName: "card card-medium flip", // depends of level - responsible for sizing
          unflippedClassName: "card card-medium",
          boardClassName: "board-medium",
        });
        break;

      case "hard":
        numOfCardPairsToGenerate = 16;
        maxValueToIterate = hardImgSrcs.length;
        imgSourceList = hardImgSrcs;

        this.setState({
          numOfCardPairsToGenerate: 16,
          flippedClassName: "card card-hard flip", // depends of level - responsible for sizing
          unflippedClassName: "card card-hard",
          boardClassName: "board-hard",
        });
        break;
    }
    //----------------------GENERATING CARDS ------------------------------
    for (let i = 0; i < numOfCardPairsToGenerate; i++) {
      let randomNum;

      // select (6 || 10 || 16) different random nums, where max value is picture arr length
      do {
        randomNum = Math.floor(Math.random() * (maxValueToIterate - 1) + 1);
      } while (randomGenerated.indexOf(randomNum) >= 0);

      randomGenerated.push(randomNum);

      const card = {
        id: i,
        imgSource: imgSourceList[randomNum],
      };

      cardsArr = [...cardsArr, card, card];
    }

    this.shuffle(cardsArr);

    return cardsArr;
  };
 
  shuffle = (cardList) => {
    for (let i = cardList.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [cardList[i - 1], cardList[j]] = [cardList[j], cardList[i - 1]];
    }
  };

  //flip clicked card if it's id is on the list on temporary flipped
  flipClickedCard = (cardKey) => {
    const {  temporaryFlippedCards } = this.state;
    const { unflippedClassName, flippedClassName } = levelSettings[gameState.choosenLevel];

    return temporaryFlippedCards.indexOf(cardKey) >= 0
      ? flippedClassName
      : unflippedClassName;
  };

  //check if current genereted card id is on the list of guessed
  isGuessed = (cardId) => {
    return this.state.guessedCardsList.indexOf(cardId) >= 0;
  };

  render() {
    const {
      guessedCardsList: listOfGuesedCardPairs,
      moves,
      start,
    } = this.state;

    const { boardClassName, flippedClassName, numberOfAllCardPairs } = levelSettings[gameState.choosenLevel];

    //for stoping interval in scoreboard
    if (listOfGuesedCardPairs.length === numberOfAllCardPairs) {
      gameState.gameOver = true;
    }

    const cardList = this.state.cards.map((card, index) => {
      const isGuessed = this.isGuessed(card.id); //check if this card has flipped pair
      const className = isGuessed
        ? flippedClassName
        : this.flipClickedCard(index); //set flip state depending if it's guessed, flipped or not flipped

      return (
        <Card
          cardClicked={this.handleCardClick}
          key={index}
          index={index}
          id={card.id}
          matched={isGuessed}
          className={className}
          imgSrc={card.imgSource}
        />
      );
    });

    return (
      <div>
        {gameState.gameOver && (
          <GameOver retryLevel={this.reloadBoardOnTryAgain} />
        )}
        {start && (
          <FadeIn transitionDuration={800}>
            <ScoreBoard moves={moves} />
          </FadeIn>
        )}
        <section className={boardClassName}>{cardList}</section>
      </div>
    );
  }
}

export default view(Board);
