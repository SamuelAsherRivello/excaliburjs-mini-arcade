import { error } from 'console';
import { Card, Suit } from './Card';

export class Deck {
  private cards: Card[] = [];

  constructor() {
    this.initializeDeck();
  }

  private initializeDeck(): void {
    for (let suit of Object.values(Suit).filter((v) => typeof v === 'number')) {
      for (let value = 1; value <= 13; value++) {
        this.cards.push(new Card(suit as Suit, value));
      }
    }
  }

  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  drawCard(): Card | undefined {
    return this.cards.pop();
  }
}
