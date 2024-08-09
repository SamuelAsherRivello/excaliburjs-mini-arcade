import * as ex from 'excalibur';
import { Asteroid } from './Asteroid';
import { asteroidsResourceCollection } from '../settings/AsteroidsResourceCollection';
import { MiniGameAnimations } from '../../../systems/MiniGameAnimations';
import { AsteroidsCollisionGroups } from '../settings/AsteroidsCollisionGroups';
import { ActorAdvanced, ActorConfiguration } from '@client/core/engines/excaliburjs/actors/ActorAdvanced';
import { RelativeTo, ScaleAspectRatio, Unit } from '@client/core/engines/excaliburjs/layout/LayoutEngine';
import { IDestroyable } from '@client/core/interfaces/IDestroyable';
import { MiniGameParticles } from '@client/projects/miniGameGallery/systems/MiniGameParticles';

export interface BulletConfiguration extends ActorConfiguration {}

export const BulletConfigurationDefault: BulletConfiguration = {
  imageSource: asteroidsResourceCollection.get<ex.ImageSource>('Bullet01'),
  collisionGroup: AsteroidsCollisionGroups.Bullet,
  collisionType: ex.CollisionType.Active,
  layoutConfiguration: {
    sizeLayoutConfiguration: {
      width: { value: 20, unit: Unit.Percent },
      height: { value: 20, unit: Unit.Percent },
      relativeTo: RelativeTo.Screen,
      scaleAspectRatio: ScaleAspectRatio.PrioritizeWidth,
    },
  },
};
export class Bullet extends ActorAdvanced implements IDestroyable {
  // Properties -----------------------------------
  public override get configuration(): BulletConfiguration {
    return this._configuration as BulletConfiguration;
  }

  public get isDestroying(): boolean {
    return this._isDestroying;
  }

  // Fields ---------------------------------------
  public static readonly Speed: number = 500;
  private readonly _lifespan: number = 1000;
  private _isDestroying: boolean = false;

  // Initialization -------------------------------
  constructor(configuration: BulletConfiguration) {
    //
    configuration = { ...BulletConfigurationDefault, ...configuration };
    super(configuration);

    // Set values
    this.vel = configuration.vel ?? ex.vec(0, 0);
    this.body.useGravity = false;
  }

  async onInitialize(engine: ex.Engine) {
    const sprite = this.configuration.imageSource!.toSprite();
    sprite.scale = this.layoutEngine.getCalculatedScale(this.configuration.imageSource);
    this.graphics.use(sprite);

    const radiusFactor = 0.25; // Make smaller
    this.collider.set(
      new ex.CircleCollider({
        radius: Math.max(sprite.width / 2, sprite.height / 2) * radiusFactor,
      }),
    );

    // Rotate to face the moving direction
    this.rotation = Math.atan2(this.vel.y, this.vel.x);

    // Set up collision handling
    this.on('collisionstart', (evt) => {
      if (evt.other instanceof Asteroid) {
        if (!this._isDestroying) {
          evt.other.health.value -= Asteroid.HealthDelta;

          this.destroy();
        }
      }
    });

    // Set up a timer to destroy the bullet after its lifespan
    engine.clock.schedule(() => {
      this.onDestroyComplete();
    }, this._lifespan);

    this.actions.clearActions();
    await MiniGameAnimations.scaleUpAndFadeUpAsync(this, { duration: 100 });
  }

  // Methods --------------------------------------

  // Event Handlers -------------------------------
  public async destroy() {
    // Prep
    this._isDestroying = true; //Useful for turning off any movement
    this.vel.scale(0.1); //slow it dramatically
    this.collider.clear(); //stop collision

    //
    asteroidsResourceCollection.get<ex.Sound>('Hit02').play();

    // Wait
    this.actions.clearActions();
    await MiniGameAnimations.scaleDownAndFadeDownAsync(this, { duration: 100 });

    // Result
    this.onDestroyComplete();
  }
  public async onDestroyComplete() {
    if (!this.isKilled) {
      this.kill();
    }
  }
}
