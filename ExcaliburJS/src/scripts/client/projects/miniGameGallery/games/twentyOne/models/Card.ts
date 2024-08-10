export enum Suit {
  Hearts,
  Diamonds,
  Clubs,
  Spades,
}

export class Card {
  constructor(
    public suit: Suit,
    public value: number,
  ) {}

  get displayValue(): string {
    switch (this.value) {
      case 1:
        return 'A';
      case 11:
        return 'J';
      case 12:
        return 'Q';
      case 13:
        return 'K';
      default:
        return this.value.toString();
    }
  }
}
