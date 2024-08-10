import { Hand } from './Hand';

export class Player {
  constructor(
    public name: string,
    public hand: Hand = new Hand(),
  ) {}
}
