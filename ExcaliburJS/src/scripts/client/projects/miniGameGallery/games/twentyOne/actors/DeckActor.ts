import * as ex from 'excalibur';
import { ActorAdvanced, ActorConfiguration } from '@client/core/engines/excaliburjs/actors/ActorAdvanced';
import { RelativeTo, ScaleAspectRatio, Unit } from '@client/core/engines/excaliburjs/layout/LayoutEngine';
import { twentyOneResourceCollection } from '../settings/TwentyOneResourceCollection';
import { Deck } from '../models/Deck';
import { CardActor } from './CardActor';
import { TwentyOneConstants } from '../settings/TwentyOneConstants';

export interface DeckActorConfiguration extends ActorConfiguration {}

export const DeckActorConfigurationDefault: DeckActorConfiguration = {
  name: 'Deck', //For Debugging
  imageSource: twentyOneResourceCollection.get<ex.ImageSource>('CardBack05'),
  layoutConfiguration: {
    sizeLayoutConfiguration: {
      width: { value: TwentyOneConstants.CardWidthPercentage, unit: Unit.Percent },
      height: { value: TwentyOneConstants.CardHeightPercentage, unit: Unit.Percent },
      relativeTo: RelativeTo.Screen,
      scaleAspectRatio: ScaleAspectRatio.PrioritizeHeight,
    },
    positionLayoutConfiguration: {
      x: { value: 15, unit: Unit.Percent },
      y: { value: 10, unit: Unit.Percent },
      relativeTo: RelativeTo.Screen,
    },
  },
};

export class DeckActor extends ActorAdvanced {
  private _deck: Deck;

  constructor(deck: Deck) {
    super(DeckActorConfigurationDefault);
    this._deck = deck;
    this.name = 'My deck';
  }

  public drawCard(isFront: boolean): CardActor | undefined {
    const card = this._deck.drawCard();

    if (card) {
      const cardActor = new CardActor(card);
      cardActor.pos = this.pos.clone();
      cardActor.isFront = isFront;
      this.addChild(cardActor);

      return cardActor;
    }
    return undefined;
  }
}
