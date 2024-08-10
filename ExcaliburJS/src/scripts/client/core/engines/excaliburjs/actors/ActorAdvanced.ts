import * as ex from 'excalibur';
import { LayoutConfiguration, LayoutConfigurationDefault, LayoutEngine, RelativeTo, Unit } from '../layout/LayoutEngine';

export interface ActorConfiguration extends ex.ActorArgs {
  imageSource?: ex.ImageSource;
  layoutConfiguration?: LayoutConfiguration;
}

const ActorConfigurationDefault: ActorConfiguration = {
  layoutConfiguration: LayoutConfigurationDefault,
};

export class ActorAdvanced extends ex.Actor {
  // Properties -----------------------------------
  public get configuration(): ActorConfiguration {
    return this._configuration;
  }

  public get layoutEngine(): LayoutEngine {
    return this._layoutEngine;
  }

  public override get width(): number {
    return this.layoutEngine.getCalculatedWidth(this._configuration.imageSource);
  }

  public override get height(): number {
    return this.layoutEngine.getCalculatedHeight(this._configuration.imageSource);
  }

  // Fields ---------------------------------------
  private _layoutEngine: LayoutEngine;
  protected _configuration: ActorConfiguration;

  // Initialization -------------------------------
  constructor(configuration: ActorConfiguration) {
    //
    let layoutEngine;
    //
    if (configuration.layoutConfiguration) {
      layoutEngine = new LayoutEngine(configuration.layoutConfiguration);
    } else {
      layoutEngine = new LayoutEngine(LayoutConfigurationDefault);
    }

    // Use layout if width is not provided
    if (!configuration.width) {
      configuration.width = layoutEngine.getCalculatedWidth(configuration.imageSource);
    }

    // Use layout if height is not provided
    if (!configuration.height) {
      configuration.height = layoutEngine.getCalculatedHeight(configuration.imageSource);
    }

    // Use layout if pos is not provided
    if (!configuration.pos) {
      configuration.pos = layoutEngine.getCalculatedPosition(configuration.imageSource);
    }

    //
    super(configuration);

    this._configuration = configuration as ActorConfiguration;
    this._layoutEngine = layoutEngine;
  }

  public onInitialize(engine: ex.Engine) {
    if (this.children.length > 0) {
      console.log(this.constructor.name + ' already has children. 1. ' + 'Allow ActorAdvanced to do it or just dont call super.onInitialize()');
      return;
    }

    const sprite = this.configuration.imageSource!.toSprite();
    sprite.scale = this.layoutEngine.getCalculatedScale(this.configuration.imageSource);
    this.graphics.use(sprite);
  }

  // Methods --------------------------------------

  // Event Handlers -------------------------------
}
