import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card from './Card';


describe('<Card />', () => {
    test('it should mount', () => {
        const cardInfo = { value: 'Q', symbol: '♡' };
        render(<Card card={ cardInfo } />);

        const card = screen.getByTestId('Card');

        expect(card).toBeInTheDocument();
    });
});
