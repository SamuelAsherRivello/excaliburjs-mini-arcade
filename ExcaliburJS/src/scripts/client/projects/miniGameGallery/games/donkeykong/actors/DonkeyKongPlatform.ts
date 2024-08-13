import * as ex from 'excalibur';
import { donkeyKongResourceCollection } from '../settings/DonkeyKongResourceCollection';
import { ActorAdvanced, ActorConfiguration } from '@client/core/engines/excaliburjs/actors/ActorAdvanced';
import { RelativeTo, ScaleAspectRatio, Unit } from '@client/core/engines/excaliburjs/layout/LayoutEngine';
import { DonkeyKongCollisionGroup } from '../settings/DonkeyKongCollisionGroup';
import { MiniGameMaterials } from '@client/projects/miniGameGallery/systems/MiniGameMaterials';

export interface DonkeyKongPlatformConfiguration extends ActorConfiguration {}

export const DonkeyKongPlatformConfigurationDefault: DonkeyKongPlatformConfiguration = {
  collisionType: ex.CollisionType.Fixed,
  collisionGroup: DonkeyKongCollisionGroup.PlatformGroup,
  anchor: ex.vec(0.5, 0.5),
  imageSource: donkeyKongResourceCollection.get<ex.ImageSource>('Platform01'),
  layoutConfiguration: {
    sizeLayoutConfiguration: {
      width: { value: 80, unit: Unit.Percent },
      height: { value: 80, unit: Unit.Percent },
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
 * Represents the player-controlled frog in the Frogger game.
 */
export class DonkeyKongPlatform extends ActorAdvanced {
  // Properties -----------------------------------

  // Fields ---------------------------------------

  // Initialization -------------------------------
  constructor(configuration: DonkeyKongPlatformConfiguration = DonkeyKongPlatformConfigurationDefault) {
    //
    configuration = { ...DonkeyKongPlatformConfigurationDefault, ...configuration };
    //
    super(configuration);
  }

  // Methods --------------------------------------
  public onInitialize(engine: ex.Engine) {
    // Add graphics and set position
    super.onInitialize(engine);

    // Add custom Material
    this.graphics.material = MiniGameMaterials.getMaterial_DropShadow();
  }

  // Event Handlers -------------------------------
}
