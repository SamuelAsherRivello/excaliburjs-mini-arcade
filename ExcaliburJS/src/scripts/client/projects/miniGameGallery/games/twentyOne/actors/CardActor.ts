import * as ex from 'excalibur';
import { MiniGameAnimations } from '@client/projects/miniGameGallery/systems/MiniGameAnimations';
import { MiniGameParticles } from '@client/projects/miniGameGallery/systems/MiniGameParticles';
import { ActorAdvanced, ActorConfiguration } from '@client/core/engines/excaliburjs/actors/ActorAdvanced';
import { RelativeTo, ScaleAspectRatio, Unit } from '@client/core/engines/excaliburjs/layout/LayoutEngine';
import { twentyOneResourceCollection } from '../settings/TwentyOneResourceCollection';
import { Card } from '../models/Card';

export interface PlayingCardActorConfiguration extends ActorConfiguration {
  isFront: boolean;
  imageSourceCardFront: ex.ImageSource;
  imageSourceCardBack: ex.ImageSource;
}

export const PlayingCardActorConfigurationDefault: PlayingCardActorConfiguration = {
  // Replace fronts at runtime
  imageSourceCardBack: twentyOneResourceCollection.get<ex.ImageSource>('CardBack01'),
  imageSourceCardFront: twentyOneResourceCollection.get<ex.ImageSource>('CardBack01'),
  imageSource: twentyOneResourceCollection.get<ex.ImageSource>('CardBack01'),

  //
  isFront: false,
  layoutConfiguration: {
    sizeLayoutConfiguration: {
      width: { value: 20, unit: Unit.Percent },
      height: { value: 20, unit: Unit.Percent },
      relativeTo: RelativeTo.Screen,
      scaleAspectRatio: ScaleAspectRatio.PrioritizeHeight,
    },
  },
};

/**
 * Represents the player-controlled frog in the Frogger game.
 */
export class CardActor extends ActorAdvanced {
  // Properties -----------------------------------
  public get isFront(): boolean {
    return this._isFront;
  }
  public get card(): Card {
    return this._card;
  }
  public set isFront(value: boolean) {
    this._isFront = value;
    this.updateVisuals();
  }
  public override get configuration(): PlayingCardActorConfiguration {
    return this._configuration as PlayingCardActorConfiguration;
  }

  // Fields ---------------------------------------
  public readonly _moveSpeed = 3000;
  private _card: Card;
  private _isFront: boolean = false;
  // Initialization -------------------------------
  constructor(card: Card) {
    //
    super(PlayingCardActorConfigurationDefault);
    this._card = card;
    this.isFront = this.configuration.isFront;
  }

  // Methods --------------------------------------
  public onInitialize() {
    this.updateVisuals();
  }

  public updateVisuals() {
    //Update front
    this.configuration.imageSourceCardFront = twentyOneResourceCollection.getCardFrontByCard(this._card);

    //update card
    const sprite = this.isFront ? this.configuration.imageSourceCardFront.toSprite() : this.configuration.imageSourceCardBack.toSprite();
    sprite.scale = this.layoutEngine.getCalculatedScale(this.configuration.imageSource);
    this.graphics.add(sprite);

    this.collider.set(
      new ex.CircleCollider({
        radius: Math.max(sprite.width / 2, sprite.height / 2),
      }),
    );
  }

  public async move(engine: ex.Engine, delta: number, movement: ex.Vector) {
    movement = movement.scale(this._moveSpeed * (delta / 1000));

    this.pos = this.pos.add(movement);

    MiniGameAnimations.scaleDownAndUpAsync(this);
    MiniGameParticles.particlesAddDustAsync(this, { duration: 100 });
  }

  // Event Handlers -------------------------------
}
