import { Card } from './Card';

export class Hand {
  private cards: Card[] = [];

  addCard(card: Card): void {
    this.cards.push(card);
  }

  getCards(): Card[] {
    return this.cards;
  }

  getScore(): number {
    let score = 0;
    let aceCount = 0;

    for (const card of this.cards) {
      if (card.value === 1) {
        aceCount++;
        score += 11;
      } else {
        score += Math.min(card.value, 10);
      }
    }

    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount--;
    }

    return score;
  }

  clear(): void {
    this.cards = [];
  }
}
