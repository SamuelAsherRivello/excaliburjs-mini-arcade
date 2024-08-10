import * as ex from 'excalibur';
import { ActorAdvanced, ActorConfiguration } from '@client/core/engines/excaliburjs/actors/ActorAdvanced';
import { Player } from '../models/Player';
import { CardActor } from './CardActor';
import { RelativeTo, ScaleAspectRatio, Unit } from '@client/core/engines/excaliburjs/layout/LayoutEngine';
import { twentyOneResourceCollection } from '../settings/TwentyOneResourceCollection';
import { MiniGameAnimations } from '@client/projects/miniGameGallery/systems/MiniGameAnimations';
import { TwentyOneConstants } from '../settings/TwentyOneConstants';

export interface HandActorConfiguration extends ActorConfiguration {
  positionOffsetPercentage: ex.Vector;
}

export const DealerHandActorConfigurationDefault: HandActorConfiguration = {
  name: 'Dealer', //For Debugging
  // Replace fronts at runtime
  imageSource: twentyOneResourceCollection.get<ex.ImageSource>('CardBack03'),
  positionOffsetPercentage: ex.vec(0.3, 0),
  layoutConfiguration: {
    sizeLayoutConfiguration: {
      width: { value: TwentyOneConstants.CardWidthPercentage, unit: Unit.Percent },
      height: { value: TwentyOneConstants.CardHeightPercentage, unit: Unit.Percent },
      relativeTo: RelativeTo.Screen,
      scaleAspectRatio: ScaleAspectRatio.PrioritizeHeight,
    },
    positionLayoutConfiguration: {
      x: { value: 40, unit: Unit.Percent },
      y: { value: 20, unit: Unit.Percent },
      relativeTo: RelativeTo.Screen,
    },
  },
};

export const PlayerHandActorConfigurationDefault: HandActorConfiguration = {
  name: 'Player', //For Debugging
  // Replace fronts at runtime
  imageSource: twentyOneResourceCollection.get<ex.ImageSource>('CardBack04'),
  positionOffsetPercentage: ex.vec(0.3, 0),
  layoutConfiguration: {
    sizeLayoutConfiguration: {
      width: { value: TwentyOneConstants.CardWidthPercentage, unit: Unit.Percent },
      height: { value: TwentyOneConstants.CardHeightPercentage, unit: Unit.Percent },
      relativeTo: RelativeTo.Screen,
      scaleAspectRatio: ScaleAspectRatio.PrioritizeHeight,
    },
    positionLayoutConfiguration: {
      x: { value: 60, unit: Unit.Percent },
      y: { value: 80, unit: Unit.Percent },
      relativeTo: RelativeTo.Screen,
    },
  },
};

/**
 * Represents the player-controlled frog in the Frogger game.
 */
export class HandActor extends ActorAdvanced {
  // Properties -----------------------------------
  public get cardActors(): CardActor[] {
    return this._cardActors;
  }
  public get player(): Player {
    return this._player;
  }
  public override get configuration(): HandActorConfiguration {
    return this._configuration as HandActorConfiguration;
  }

  // Fields ---------------------------------------
  private _cardActors: CardActor[];
  private _player: Player;

  // Initialization -------------------------------
  constructor(player: Player, configuration: HandActorConfiguration) {
    //
    super(configuration);
    this._cardActors = [];
    this._player = player;
  }

  override onInitialize(engine: ex.Engine) {
    super.onInitialize(engine);

    console.log(this._player.name, this.pos);
  }

  // Methods --------------------------------------
  public clearCardActors() {
    this._cardActors.forEach((cardActor) => cardActor.kill());
  }

  public async addCardActorAsync(cardActor: CardActor): Promise<void> {
    this._cardActors.push(cardActor);
    const newPosition: ex.Vector = this.pos.add(this.configuration.positionOffsetPercentage.scale(this.width * this.cardActors.length));
    await MiniGameAnimations.moveToAsync(cardActor, newPosition, { duration: 200 });
  }

  // Event Handlers -------------------------------
}
