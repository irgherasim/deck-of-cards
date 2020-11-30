import React from 'react';
import suits from './../../assets/data/suits';
import cardsValues from './../../assets/data/cards-values';

import Card from './../Card/Card';
import './Deck.css';

class Deck extends React.Component {
  constructor() {
    super();
    this.handleShuffle = this.handleShuffle.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleDraw = this.handleDraw.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.restartGame = this.restartGame.bind(this);
    const preparedCardsData = this.buildDataForCards();

    this.state = {
      deck: preparedCardsData || [],
      deckOfCards: this.buildCards(preparedCardsData) || []
    };
    this.handleSort();
  }
  buildDataForCards() {
    // build data for deck of cards
    const data = [];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < cardsValues.length; j++) {
        let card = { value: cardsValues[j], suit: suits[i], isSelected: false };
        data.push(card);
      }
    }
    return data;
  }
  buildCards(data) {
    const deckOfCards = data.map((card, index) => {
      const cardInfo = {
        value: card.value,
        suit: card.suit,
        isSelected: card.isSelected
      };

      return (
        <div className="card-container" key={index}>
          <Card card={cardInfo} key={index} handleChange={this.handleChange} />
        </div>
      );
    });
    return deckOfCards;
  }
  handleChange(cardInfo) {
    const markedCards = this.state.deck.map(card => {
      if (
        card.value.value === cardInfo.value.value &&
        card.suit.symbol === cardInfo.suit.symbol
      ) {
        card.isSelected = !card.isSelected;
      }
      return card;
    });

    this.setState({
      deck: markedCards,
      deckOfCards: this.buildCards(markedCards)
    });
  }
  handleShuffle() {
    const shuffledDeck = [...this.state.deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let temp = shuffledDeck[i];
      shuffledDeck[i] = shuffledDeck[j];
      shuffledDeck[j] = temp;
    }

    this.setState({
      deck: shuffledDeck,
      deckOfCards: this.buildCards(shuffledDeck)
    });
  }
  handleSort() {
    //sort by value
    const sortedDeck = [...this.state.deck];
    sortedDeck
      .sort((card1, card2) => card1.value.precedence - card2.value.precedence)
      .sort((card1, card2) => card1.suit.order - card2.suit.order);

    this.setState({
      deck: sortedDeck,
      deckOfCards: this.buildCards(sortedDeck)
    });
  }
  handleDraw() {
    let remainingCards = this.state.deck
      .filter(card => card.isSelected === true)
      .map(card => {
        card.isSelected = false;
        return card;
      });
    remainingCards =
      remainingCards.length === 0 ? this.state.deck : remainingCards;
    this.setState({
      deck: remainingCards.length === 0 ? this.state.deck : remainingCards,
      deckOfCards: this.buildCards(remainingCards)
    });
  }
  restartGame() {
    const preparedCardsData = this.buildDataForCards();
    this.setState({
      deck: preparedCardsData || [],
      deckOfCards: this.buildCards(preparedCardsData) || []
    });
  }
  render() {
    return (
      <>
        <div className="buttons-group">
          <button onClick={this.handleShuffle}> Shuffle </button>
          <button onClick={this.handleSort}> Sort </button>
          <button onClick={this.handleDraw}> Draw </button>
          <button onClick={this.restartGame}>Restart game</button>
        </div>
        <div className="cards-panels">
          <div className="Deck">{this.state.deckOfCards}</div>
        </div>
      </>
    );
  }
}
export default Deck;
