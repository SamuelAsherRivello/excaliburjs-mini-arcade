import * as ex from 'excalibur';
import { Bullet, BulletConfigurationDefault } from './Bullet';
import { AsteroidsCollisionGroups } from '../settings/AsteroidsCollisionGroups';
import { asteroidsResourceCollection } from '../settings/AsteroidsResourceCollection';
import { ActorAdvanced, ActorConfiguration } from '@client/core/engines/excaliburjs/actors/ActorAdvanced';
import { ScaleAspectRatio, RelativeTo, Unit } from '@client/core/engines/excaliburjs/layout/LayoutEngine';
import { CameraShake, MiniArcadeAnimations } from '@client/projects/miniArcade/settings/MiniArcadeAnimations';

export interface ShipPlayerConfiguration extends ActorConfiguration {}

export const ShipPlayerConfigurationDefault: ShipPlayerConfiguration = {
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
export class ShipPlayer extends ActorAdvanced {
  // Events ---------------------------------------
  public override get configuration(): ShipPlayerConfiguration {
    return this._configuration as ShipPlayerConfiguration;
  }
  // Properties -----------------------------------

  // Fields ---------------------------------------
  private readonly MaxRotationSpeed: number = 0.05;
  private readonly RotationAcceleration: number = 0.0005;
  private readonly RotationDeceleration: number = 0.001;
  private readonly ThrustForce: number = 200;
  private readonly MaxSpeed: number = 300;
  private readonly DragCoefficient: number = 0.01;
  private readonly BulletSpeed: number = 800;
  //
  private _currentRotationSpeed: number = 0;
  private _rotationHoldTime: number = 0;
  private _canShoot: boolean = true;
  private _shootCooldown: number = 250;

  // Initialization -------------------------------
  constructor(configuration: ShipPlayerConfiguration = ShipPlayerConfigurationDefault) {
    //
    configuration = { ...ShipPlayerConfigurationDefault, ...configuration };
    super(configuration);
    //
  }

  // Methods --------------------------------------
  onInitialize() {
    const sprite = this.configuration.imageSource!.toSprite();
    sprite.scale = this.layoutEngine.getCalculatedScale(this.configuration.imageSource);
    this.graphics.add(sprite);

    this.collider.set(
      new ex.CircleCollider({
        radius: Math.max(sprite.width / 2, sprite.height / 2),
      }),
    );
  }

  onPreUpdate(engine: ex.Engine, delta: number): void {
    this.applyDrag(delta);
    this.wrapAround(engine);
    this.updateShootCooldown(delta);
  }

  rotate(engine: ex.Engine, delta: number, direction: number): void {
    if (direction !== 0) {
      this._rotationHoldTime += delta;
      this._currentRotationSpeed += this.RotationAcceleration * delta * direction;
    } else {
      this._rotationHoldTime = 0;
      if (this._currentRotationSpeed > 0) {
        this._currentRotationSpeed = Math.max(0, this._currentRotationSpeed - this.RotationDeceleration * delta);
      } else if (this._currentRotationSpeed < 0) {
        this._currentRotationSpeed = Math.min(0, this._currentRotationSpeed + this.RotationDeceleration * delta);
      }
    }

    const targetSpeed = Math.min(this.MaxRotationSpeed, (this._rotationHoldTime / 500) * this.MaxRotationSpeed);
    this._currentRotationSpeed = ex.clamp(this._currentRotationSpeed, -targetSpeed, targetSpeed);
    this.rotation += this._currentRotationSpeed;
  }

  move(engine: ex.Engine, delta: number): void {
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

    await MiniArcadeAnimations.cameraShakeAsync(engine, CameraShake.Light);

    asteroidsResourceCollection.get<ex.Sound>('Shoot01').play();
  }

  private applyDrag(delta: number): void {
    const dragForce = this.vel.negate().scale(this.DragCoefficient * this.vel.size);
    this.vel = this.vel.add(dragForce.scale(delta / 1000));
  }

  private wrapAround(engine: ex.Engine): void {
    this.pos = new ex.Vector((this.pos.x + engine.drawWidth) % engine.drawWidth, (this.pos.y + engine.drawHeight) % engine.drawHeight);
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
