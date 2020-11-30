import React from 'react';
import './Card.css';

class Card extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { card } = this.props;
    const symbols = [];
    if (isNaN(parseInt(card.value.value))) {
      symbols.push(
        <div>
          <span>{card.suit.symbol}</span>
        </div>
      );
    } else {
      for (let i = 0; i < parseInt(card.value.value); i++) {
        symbols.push(
          <div>
            <span>{card.suit.symbol}</span>
          </div>
        );
      }
    }
    return (
      <div
        className={[
          'Card',
          'color-' + card.suit.color,
          card.isSelected ? 'Card-overlay' : ''
        ].join(' ')}
        onClick={() => this.props.handleChange(card)}
      >
        <div className={'Card-Left'}>
          <span>{card.value.value}</span>
        </div>

        <div
          className={'Card-Center-' + (symbols.length > 1 ? 'Grid' : 'Flex')}
        >
          {symbols}
        </div>
        <div className="Card-Right">
          <span>{card.value.value}</span>
        </div>
      </div>
    );
  }
}

export default Card;
