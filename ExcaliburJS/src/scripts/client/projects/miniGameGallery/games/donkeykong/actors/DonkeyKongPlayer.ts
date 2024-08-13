import * as ex from 'excalibur';
import { donkeyKongResourceCollection } from '../settings/DonkeyKongResourceCollection';
import { MiniGameParticles } from '@client/projects/miniGameGallery/systems/MiniGameParticles';
import { ActorAdvanced, ActorConfiguration } from '@client/core/engines/excaliburjs/actors/ActorAdvanced';
import { RelativeTo, ScaleAspectRatio, Unit } from '@client/core/engines/excaliburjs/layout/LayoutEngine';
import { MiniGameMaterials } from '@client/projects/miniGameGallery/systems/MiniGameMaterials';
import { DonkeyKongCollisionGroup } from '../settings/DonkeyKongCollisionGroup';
import { MiniGame } from '@client/projects/miniGameGallery/MiniGame';

export interface DonkeyKongPlayerConfiguration extends ActorConfiguration {}

export const DonkeyKongPlayerConfigurationDefault: DonkeyKongPlayerConfiguration = {
  collisionType: ex.CollisionType.Active,
  collisionGroup: DonkeyKongCollisionGroup.Player,
  imageSource: donkeyKongResourceCollection.get<ex.ImageSource>('Hero01'),
  layoutConfiguration: {
    sizeLayoutConfiguration: {
      width: { value: 10, unit: Unit.Percent },
      height: { value: 10, unit: Unit.Percent },
      relativeTo: RelativeTo.Screen,
      scaleAspectRatio: ScaleAspectRatio.PrioritizeHeight,
    },
    positionLayoutConfiguration: {
      x: { value: 50, unit: Unit.Percent },
      y: { value: 10, unit: Unit.Percent },
      relativeTo: RelativeTo.Screen,
    },
  },
};

/**
 * Represents the player-controlled frog in the Frogger game.
 */
export class DonkeyKongPlayer extends ActorAdvanced {
  // Properties -----------------------------------
  public get canJump(): boolean {
    return this._isOnGround;
  }

  public get canMove(): boolean {
    return this._isOnGround;
  }

  // Fields ---------------------------------------
  public readonly _moveSpeedX = 18000;
  public readonly _moveSpeedY = MiniGame.GravityY * 150;
  private _flipHorizontal = false;
  private _isOnGround: boolean = false;
  // Initialization -------------------------------
  constructor(configuration: DonkeyKongPlayerConfiguration = DonkeyKongPlayerConfigurationDefault) {
    //
    configuration = { ...DonkeyKongPlayerConfigurationDefault, ...configuration };
    //
    super(configuration);
  }

  // Methods --------------------------------------
  public onInitialize(engine: ex.Engine) {
    // Add graphics and set position
    super.onInitialize(engine);

    // Add custom Material
    this.graphics.material = MiniGameMaterials.getMaterial_DropShadow();

    this.on('collisionstart', this.onCollisionStart.bind(this));
    this.on('collisionend', this.onCollisionEnd.bind(this));
  }

  public async move(engine: ex.Engine, delta: number, movement: ex.Vector) {
    const movementImpulse = movement.scale(this._moveSpeedX * (delta / 1000));
    this.body.applyLinearImpulse(movementImpulse);

    if (movement.x !== 0) {
      this._flipHorizontal = movement.x > 0;

      if (this.graphics.flipHorizontal != this._flipHorizontal) {
        this.graphics.flipHorizontal = this._flipHorizontal;
        MiniGameParticles.particlesAddDustAsync(this, { duration: 100 });
      }
    }
  }

  public jump(engine: ex.Engine, delta: number, movement: ex.Vector) {
    const movementImpulse = movement.scale(this._moveSpeedY * (delta / 1000));
    this.body.applyLinearImpulse(movementImpulse);
  }

  // Event Handlers -------------------------------
  public onCollisionStart(event: any): void {
    //TODO: Why can't I use this type in the method signature?
    const { other, side, contact } = event as ex.CollisionStartEvent<ex.Actor>;

    if (!other) return;

    if (other.body.group == DonkeyKongCollisionGroup.PlatformGroup) {
      //console.log('onCollisionStart with: ' + other.body.group.name);
      this._isOnGround = true;
    }
  }

  public onCollisionEnd(event: any): void {
    //TODO: Why can't I use this type in the method signature?
    const { other, side, contact } = event as ex.CollisionStartEvent<ex.Actor>;

    if (!other) return;

    if (other.body.group == DonkeyKongCollisionGroup.PlatformGroup) {
      //console.log('onCollisionEnd with: ' + other.body.group.name);
      this._isOnGround = false;
    }
  }
}
