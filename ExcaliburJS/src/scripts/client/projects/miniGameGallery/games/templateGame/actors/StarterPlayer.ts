import * as ex from 'excalibur';
import { AsteroidsCollisionGroups } from '../../asteroids/settings/AsteroidsCollisionGroups';
import { starterResourceCollection } from '../settings/StarterResourceCollection';
import { MiniGameAnimations } from '@client/projects/miniGameGallery/systems/MiniGameAnimations';
import { MiniGameParticles } from '@client/projects/miniGameGallery/systems/MiniGameParticles';
import { ActorAdvanced, ActorConfiguration } from '@client/core/engines/excaliburjs/actors/ActorAdvanced';
import { RelativeTo, ScaleAspectRatio, Unit } from '@client/core/engines/excaliburjs/layout/LayoutEngine';

export interface StarterConfiguration extends ActorConfiguration {}

export const StarterConfigurationDefault: StarterConfiguration = {
  collisionType: ex.CollisionType.Active,
  collisionGroup: AsteroidsCollisionGroups.Player,
  imageSource: starterResourceCollection.get<ex.ImageSource>('KnightStatic01'),
  layoutConfiguration: {
    sizeLayoutConfiguration: {
      width: { value: 30, unit: Unit.Percent },
      height: { value: 30, unit: Unit.Percent },
      relativeTo: RelativeTo.Screen,
      scaleAspectRatio: ScaleAspectRatio.PrioritizeHeight,
    },
    positionLayoutConfiguration: {
      x: { value: 50, unit: Unit.Percent },
      y: { value: 50, unit: Unit.Percent },
      relativeTo: RelativeTo.Screen,
    },
  },
};

/**
 * Represents the player-controlled frog in the Frogger game.
 */
export class StarterPlayer extends ActorAdvanced {
  // Properties -----------------------------------

  // Fields ---------------------------------------
  public readonly _moveSpeed = 3000;
  private shadowVisible = true;
  private _shadowTintCache!: ex.Color;
  private _shadowTint = new ex.Color(0, 0, 0, 0.2);
  private _shadowOffset = ex.vec(3, 3);
  private _flipHorizontal = false;
  // Initialization -------------------------------
  constructor(configuration: StarterConfiguration = StarterConfigurationDefault) {
    //
    configuration = { ...StarterConfigurationDefault, ...configuration };
    //
    super(configuration);
  }

  // Methods --------------------------------------
  public onInitialize() {
    const sprite = this.configuration.imageSource!.toSprite();
    sprite.scale = this.layoutEngine.getCalculatedScale(this.configuration.imageSource);
    this.graphics.add(sprite);

    this.collider.set(
      new ex.CircleCollider({
        radius: Math.max(sprite.width / 2, sprite.height / 2),
      }),
    );

    this.graphics.onPreDraw = (ctx: ex.ExcaliburGraphicsContext) => {
      if (!this.shadowVisible || !this.graphics) {
        return;
      }

      // set the shadow tint/opacity
      this._shadowTintCache = ctx.tint;
      ctx.tint = this._shadowTint;

      // loop through all graphics and draw them with the shadow offset
      for (const g of Object.values(this.graphics.graphics)) {
        g.draw(ctx, -g.width * this.anchor.x + this._shadowOffset.x, -g.height * this.anchor.y + this._shadowOffset.y);
      }

      // put the tint back for the rest of the drawing
      ctx.tint = this._shadowTintCache;
    };
  }

  public async move(engine: ex.Engine, delta: number, movement: ex.Vector) {
    movement = movement.scale(this._moveSpeed * (delta / 1000));

    this.pos = this.pos.add(movement);

    if (movement.x !== 0) {
      this._flipHorizontal = movement.x > 0;
      this.graphics.flipHorizontal = this._flipHorizontal;
    }

    MiniGameAnimations.scaleDownAndUpAsync(this);
    MiniGameParticles.particlesAddDustAsync(this, { duration: 100 });
  }

  // Event Handlers -------------------------------
}
