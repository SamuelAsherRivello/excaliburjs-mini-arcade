import * as ex from 'excalibur';
import { AsteroidsCollisionGroups } from '../../asteroids/settings/AsteroidsCollisionGroups';
import { froggerResourceCollection } from '../settings/FroggerResourceCollection';
import { MiniGameAnimations } from '@client/projects/miniGameGallery/systems/MiniGameAnimations';

/**
 * Represents the player-controlled frog in the Frogger game.
 */
export class FrogPlayer extends ex.Actor {
  // Properties -----------------------------------

  // Fields ---------------------------------------
  public static readonly DistancePerJump = 40;

  // Initialization -------------------------------
  constructor() {
    super({
      pos: ex.vec(150, 150),
      width: 50,
      height: 50,
      collisionType: ex.CollisionType.Passive,
      collisionGroup: AsteroidsCollisionGroups.Player,
    });
  }

  // Methods --------------------------------------
  onInitialize() {
    const idleSprite = froggerResourceCollection.get<ex.ImageSource>('FrogIdle01').toSprite();
    const jumpSprite = froggerResourceCollection.get<ex.ImageSource>('FrogJump01').toSprite();

    // Double the scale of the sprites
    idleSprite.scale = ex.vec(2, 2);
    jumpSprite.scale = ex.vec(2, 2);

    this.graphics.add('idle', idleSprite);
    this.graphics.add('jump', jumpSprite);
    this.graphics.use('idle');

    this.collider.set(
      new ex.CircleCollider({
        radius: Math.max(idleSprite.width, idleSprite.height) / 2,
      }),
    );
  }

  public async move(engine: ex.Engine, delta: number, movement: ex.Vector) {
    // Move the frog
    this.pos = this.pos.add(movement.scale(FrogPlayer.DistancePerJump));
    this.rotation = movement.toAngle() + Math.PI / 2;

    // Change to jump sprite
    this.graphics.use('jump');

    // Complete the jump animation
    await MiniGameAnimations.scaleUpAndDownAsync(this);

    await MiniGameAnimations.awaitTimeAsync(200);

    this.graphics.use('idle');
  }

  // Event Handlers -------------------------------
}
