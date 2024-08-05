import * as ex from 'excalibur';
import { ActorAdvanced, ActorConfiguration } from '@client/core/engines/excaliburjs/actors/ActorAdvanced';
import { ScaleAspectRatio, RelativeTo, Unit, LayoutEngine } from '@client/core/engines/excaliburjs/layout/LayoutEngine';
import { breakoutResourceCollection } from '../settings/BreakoutResourceCollection';

export interface TileConfiguration extends ActorConfiguration {}

export const TileConfigurationDefault: TileConfiguration = {
  imageSource: breakoutResourceCollection.get<ex.ImageSource>('Tile01'),
  anchor: ex.vec(0.5, 0.5),
  layoutConfiguration: {
    sizeLayoutConfiguration: {
      width: { value: 10, unit: Unit.Percent },
      height: { value: 10, unit: Unit.Percent },
      relativeTo: RelativeTo.Screen,
      scaleAspectRatio: ScaleAspectRatio.PrioritizeWidth,
    },
  },
};

/**
 * Represents one tile
 */
export class Tile extends ActorAdvanced {
  // Events ---------------------------------------

  // Properties -----------------------------------

  // Fields ---------------------------------------

  // Initialization -------------------------------
  constructor(configuration: TileConfiguration) {
    //
    configuration = { ...TileConfigurationDefault, ...configuration };
    super(configuration);

    this.on('pointerup', (evt: ex.Input.PointerEvent) => {
      console.log('click me: ' + this.pos.x);
      this.kill();
    });
    //
  }

  // Methods --------------------------------------
  onInitialize() {
    const sprite = this._configuration.imageSource!.toSprite();
    sprite.scale = this.layoutEngine.getCalculatedScale(this.configuration.imageSource);
    this.graphics.add(sprite);
  }

  onPreUpdate(engine: ex.Engine, delta: number): void {}

  // Event Handlers -------------------------------
}
