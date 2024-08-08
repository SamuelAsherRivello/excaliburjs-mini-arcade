import { ActorAdvanced, ActorConfiguration } from './ActorAdvanced';
import { ScaleAspectRatio, RelativeTo, Unit } from '../layout/LayoutEngine';
import * as ex from 'excalibur';
import { asteroidsResourceCollection } from '@client/projects/miniGameGallery/games/asteroids/settings/AsteroidsResourceCollection';

export interface BackgroundConfiguration extends ActorConfiguration {
  isScrolling?: boolean;
  scrollVelocity?: ex.Vector;
}

export const BackgroundConfigurationDefault: BackgroundConfiguration = {
  isScrolling: false,
  scrollVelocity: ex.vec(0, 0),
  imageSource: asteroidsResourceCollection.get<ex.ImageSource>('Background03'),
  layoutConfiguration: {
    sizeLayoutConfiguration: {
      width: { value: 100, unit: Unit.Percent },
      height: { value: 100, unit: Unit.Percent },
      relativeTo: RelativeTo.Screen,
      scaleAspectRatio: ScaleAspectRatio.Ignore,
    },
    positionLayoutConfiguration: {
      x: { value: 50, unit: Unit.Percent },
      y: { value: 50, unit: Unit.Percent },
      relativeTo: RelativeTo.Screen,
    },
  },
};

export class Background extends ActorAdvanced {
  // Properties -----------------------------------
  public override get configuration(): BackgroundConfiguration {
    return this._configuration as BackgroundConfiguration;
  }

  public get scrollVelocity() {
    return this._scrollVelocity;
  }
  public set scrollVelocity(value: ex.Vector) {
    this._scrollVelocity = value;
  }
  public get opacity() {
    return this._opacity;
  }
  public set opacity(value: number) {
    this._opacity = value;
  }
  // Fields ---------------------------------------
  private _offsetTemp: ex.Vector = ex.Vector.Zero;
  private _scrollSprite!: ex.Sprite;
  private _scrollVelocity: ex.Vector;
  private _isScrolling: boolean = false;
  private _opacity: number = 1;

  // Initialization -------------------------------
  constructor(configuration: BackgroundConfiguration) {
    //
    configuration = { ...BackgroundConfigurationDefault, ...configuration };
    super(configuration);
    //
    this._scrollVelocity = this.configuration.scrollVelocity ?? ex.Vector.Zero;
    this._isScrolling = this.configuration.isScrolling ?? false;
    this.z = -1;

    this.graphics.onPreDraw = this.Graphics_onPreDraw.bind(this);
  }

  async onInitialize(engine: ex.Engine) {
    this._scrollSprite = this.configuration.imageSource!.toSprite();
    this._scrollSprite.width = this.layoutEngine.getCalculatedWidth(this.configuration.imageSource);
    this._scrollSprite.height = this.layoutEngine.getCalculatedHeight(this.configuration.imageSource);

    if (!this._isScrolling) {
      this.graphics.add(this._scrollSprite);
    }
  }

  // Event Handlers -------------------------------
  private Graphics_onPreDraw(graphicsContext: ex.ExcaliburGraphicsContext, delta: number) {
    if (!this._isScrolling || !this._scrollSprite) {
      return;
    }
    graphicsContext.save();
    // Update the offset based on scroll velocity
    const reversedVelocity = this._scrollVelocity.negate();
    this._offsetTemp = this._offsetTemp.add(reversedVelocity.scale(delta / 1000));

    // Helper function to wrap the offset
    const wrapOffset = (offset: number, dimension: number) => {
      return ((offset % dimension) + dimension) % dimension;
    };

    // Wrap the offset
    this._offsetTemp = new ex.Vector(wrapOffset(this._offsetTemp.x, this.width), wrapOffset(this._offsetTemp.y, this.height));

    graphicsContext.opacity = this._opacity;
    graphicsContext.translate(-this._offsetTemp.x, -this._offsetTemp.y);

    // Draw the main background and its adjacent copies
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        this._scrollSprite.draw(graphicsContext, x * this.width, y * this.height);
      }
    }

    // Ensure restore is called after all drawing operations
    graphicsContext.restore();
  }
}
