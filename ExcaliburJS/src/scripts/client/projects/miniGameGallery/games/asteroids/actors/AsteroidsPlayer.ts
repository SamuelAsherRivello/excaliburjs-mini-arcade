import * as ex from 'excalibur';
import { Asteroid } from './Asteroid';
import { Bullet, BulletConfigurationDefault } from './Bullet';
import { AsteroidsCollisionGroups } from '../settings/AsteroidsCollisionGroups';
import { asteroidsResourceCollection } from '../settings/AsteroidsResourceCollection';
import { ActorAdvanced, ActorConfiguration } from '@client/core/engines/excaliburjs/actors/ActorAdvanced';
import { ScaleAspectRatio, RelativeTo, Unit, LayoutEngine } from '@client/core/engines/excaliburjs/layout/LayoutEngine';
import { CameraShake, MiniGameAnimations } from '@client/projects/miniGameGallery/systems/MiniGameAnimations';
import { MiniGameBehaviors } from '@client/projects/miniGameGallery/systems/MiniGameBehaviors';
import { IDestroyable } from '@client/core/interfaces/IDestroyable';
import { Console } from 'console';
import { EngineSingleton } from '@client/core/engines/excaliburjs/singletons/EngineSingleton';

export interface AsteroidsPlayerConfiguration extends ActorConfiguration { }

export const AsteroidsPlayerConfigurationDefault: AsteroidsPlayerConfiguration = {
  imageSource: asteroidsResourceCollection.get<ex.ImageSource>('Ship01'),
  collisionGroup: AsteroidsCollisionGroups.Player,
  collisionType: ex.CollisionType.Active,
  layoutConfiguration: {
    sizeLayoutConfiguration: {
      width: { value: 15, unit: Unit.Percent },
      height: { value: 15, unit: Unit.Percent },
      relativeTo: RelativeTo.Screen,
      scaleAspectRatio: ScaleAspectRatio.PrioritizeWidth,
    },
    positionLayoutConfiguration: {
      x: { value: 50, unit: Unit.Percent },
      y: { value: 50, unit: Unit.Percent },
      relativeTo: RelativeTo.Screen,
    },
  },
};

/**
 * Represents the player-controlled ship in the Asteroids game.
 */
export class AsteroidsPlayer extends ActorAdvanced implements IDestroyable {
  // Events ---------------------------------------
  public override get configuration(): AsteroidsPlayerConfiguration {
    return this._configuration as AsteroidsPlayerConfiguration;
  }
  // Properties -----------------------------------
  get isDestroying(): boolean {
    return this._isDestroying;
  }

  get isInvincibleRightNow(): boolean {
    return this._isInvincibleRightNow;
  }

  // Fields ---------------------------------------
  private readonly MaxRotationSpeed: number = 0.2;
  private readonly RotationAcceleration: number = 0.01;
  private readonly AngularDrag: number = 0.01;
  private readonly ThrustForce: number = 200 / LayoutEngine.RetroFactor;
  private readonly MaxSpeed: number = 300 / LayoutEngine.RetroFactor;
  private readonly LinearDrag: number = 0.01;
  private readonly BulletSpeed: number = 800;
  private readonly InvincibilityCooldownMilliseconds: number = 3000;
  //
  private _currentRotationSpeed: number = 0;
  private _rotationHoldTime: number = 0;
  private _canShoot: boolean = true;
  private _shootCooldown: number = 250;
  private _isDestroying: boolean = false;
  private _isInvincibleRightNow: boolean = false;

  // Initialization -------------------------------
  constructor(configuration: AsteroidsPlayerConfiguration = AsteroidsPlayerConfigurationDefault) {
    //
    configuration = { ...AsteroidsPlayerConfigurationDefault, ...configuration };
    configuration.collisionType = ex.CollisionType.Passive;
    super(configuration);
    //
  }

  destroy() {
    throw new Error('Method not implemented.');
  }
  onDestroyComplete() {
    throw new Error('Method not implemented.');
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

    this.on('collisionstart', (evt) => {
      if (evt.other instanceof Asteroid) {
        if (!this._isDestroying) {
          this.handleCollisionWithAsteroid(evt.other);
        }
      }
    });
  }

  public onPreUpdate(engine: ex.Engine, delta: number): void {
    this.applyDrag(delta);
    this.setPositionWrapAroundScreen(engine);
    this.updateShootCooldown(delta);
  }

  public rotate(engine: ex.Engine, delta: number, direction: number): void {
    if (direction !== 0) {
      this._rotationHoldTime += delta;
      this._currentRotationSpeed += this.RotationAcceleration * delta * direction;
    } else {
      this._rotationHoldTime = 0;
      if (this._currentRotationSpeed > 0) {
        this._currentRotationSpeed = Math.max(0, this._currentRotationSpeed - this.AngularDrag * delta);
      } else if (this._currentRotationSpeed < 0) {
        this._currentRotationSpeed = Math.min(0, this._currentRotationSpeed + this.AngularDrag * delta);
      }
    }

    const targetSpeed = Math.min(this.MaxRotationSpeed, (this._rotationHoldTime / 500) * this.MaxRotationSpeed);
    this._currentRotationSpeed = ex.clamp(this._currentRotationSpeed, -targetSpeed, targetSpeed);
    this.rotation += this._currentRotationSpeed;
  }

  public move(engine: ex.Engine, delta: number): void {
    const thrustVector = ex.vec(Math.sin(this.rotation) * this.ThrustForce, -Math.cos(this.rotation) * this.ThrustForce);
    this.vel = this.vel.add(thrustVector.scale(delta / 1000));

    if (this.vel.size > this.MaxSpeed) {
      this.vel = this.vel.normalize().scale(this.MaxSpeed);
    }
  }

  public async shoot(engine: ex.Engine, delta: number): Promise<void> {
    if (!this._canShoot) {
      return;
    }
    this._canShoot = false;
    this._shootCooldown = 250;

    const bulletVelocity = ex.vec(Math.sin(this.rotation) * this.BulletSpeed, -Math.cos(this.rotation) * this.BulletSpeed);
    const bulletPosition = this.pos.add(bulletVelocity.normalize().scale(this.width / 2));

    const configuration = BulletConfigurationDefault;
    configuration.pos = bulletPosition;
    configuration.vel = bulletVelocity;
    const bullet = new Bullet(configuration);

    //Put Bullet under the Player. Looks better
    bullet.z = this.z - 1;
    engine.add(bullet);

    this.actions.clearActions();
    await MiniGameAnimations.cameraShakeAsync(engine, CameraShake.Light);
    asteroidsResourceCollection.get<ex.Sound>('Shoot01').play();
  }

  private applyDrag(delta: number): void {
    const dragForce = this.vel.negate().scale(this.LinearDrag * this.vel.size);
    this.vel = this.vel.add(dragForce.scale(delta / 1000));
  }

  private setPositionWrapAroundScreen(engine: ex.Engine): void {
    MiniGameBehaviors.setPositionWrapAroundScreen(this, engine, true);
  }

  private handleCollisionWithAsteroid(asteroid: Asteroid) {
    if (this._isInvincibleRightNow) {
      return;
    }

    asteroid.health.value -= Asteroid.HealthDelta;
    asteroidsResourceCollection.get<ex.Sound>('Fire_Hit_02').play();

    this._isInvincibleRightNow = true;
    const invincibilityTimer = new ex.Timer({
      fcn: () => {
        this._isInvincibleRightNow = false;
      },
      repeats: false,
      interval: this.InvincibilityCooldownMilliseconds,
    })

    EngineSingleton.instance.currentScene.add(invincibilityTimer);
    invincibilityTimer.start();
  }

  private updateShootCooldown(delta: number): void {
    if (!this._canShoot) {
      this._shootCooldown -= delta;
      if (this._shootCooldown <= 0) {
        this._canShoot = true;
      }
    }
  }

  // Event Handlers -------------------------------
}
