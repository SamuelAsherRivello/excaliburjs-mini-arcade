import * as ex from 'excalibur';
import { AsteroidsCollisionGroups } from '../../asteroids/settings/AsteroidsCollisionGroups';
import { breakoutResourceCollection } from '../settings/BreakoutResourceCollection';
import { MiniGameAnimations } from '@client/projects/miniGameGallery/systems/MiniGameAnimations';
import { SpriteUtility } from '@client/core/engines/excaliburjs/utilities/SpriteUtility';

/**
 * Represents the player-controlled frog in the Frogger game.
 */
export class BreakoutPlayer extends ex.Actor {
  // Properties -----------------------------------

  // Fields ---------------------------------------
  public readonly _moveSpeed = 100;
  private shadowVisible = true;
  private _shadowTintCache!: ex.Color;
  private _shadowTint = new ex.Color(0, 0, 0, 0.2);
  private _shadowOffset = ex.vec(3, 3);
  private _flipHorizontal = false;

  // Initialization -------------------------------
  constructor() {
    super({
      collisionType: ex.CollisionType.Passive,
      collisionGroup: AsteroidsCollisionGroups.Player,
    });
  }

  // Methods --------------------------------------
  onInitialize() {
    let sprite = breakoutResourceCollection.get<ex.ImageSource>('Paddle01').toSprite();

    // Double the scale of the sprites
    sprite = SpriteUtility.resizeSpriteWithin(sprite, 100, 50);
    this.graphics.use(sprite);
    this.collider.set(
      new ex.CircleCollider({
        radius: Math.max(sprite.width, sprite.height) / 2,
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

    MiniGameAnimations.clearActions(this);
    await MiniGameAnimations.scaleDownAndUpAsync(this);
    await MiniGameAnimations.awaitTimeAsync(200);
  }

  // Event Handlers -------------------------------
}
