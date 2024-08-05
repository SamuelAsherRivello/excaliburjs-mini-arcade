import * as ex from 'excalibur';
import { EngineSingleton } from '../singletons/EngineSingleton';

export interface ISizeable {
  width: number;
  height: number;
}
export enum Unit {
  Pixel,
  Percent,
}
export interface LengthUnit {
  value: number;
  unit: Unit;
}

export enum RelativeTo {
  ImageSource,
  Screen,
}

export enum ScaleAspectRatio {
  Ignore,
  PrioritizeWidth, // honor the original aspect ratio, but shrink the height so that we honor the width first
  PrioritizeHeight, // honor the original aspect ratio, but shrink the width so that we honor the height first
}

export interface SizeLayoutConfiguration {
  width: LengthUnit;
  height: LengthUnit;
  relativeTo: RelativeTo;
  scaleAspectRatio: ScaleAspectRatio;
}

export interface PositionLayoutConfiguration {
  x: LengthUnit;
  y: LengthUnit;
  relativeTo: RelativeTo;
}

export interface LayoutConfiguration {
  sizeLayoutConfiguration: SizeLayoutConfiguration;
  positionLayoutConfiguration?: PositionLayoutConfiguration;
}

export const SizeLayoutConfigurationDefault: SizeLayoutConfiguration = {
  // By default, match the size of the artwork
  width: { value: 100, unit: Unit.Percent },
  height: { value: 100, unit: Unit.Percent },
  relativeTo: RelativeTo.ImageSource,
  scaleAspectRatio: ScaleAspectRatio.Ignore,
};

export const PositionLayoutConfigurationDefault: PositionLayoutConfiguration = {
  // By default, match the size of the screen
  x: { value: 50, unit: Unit.Percent },
  y: { value: 50, unit: Unit.Percent },
  relativeTo: RelativeTo.Screen,
};

export const LayoutConfigurationDefault: LayoutConfiguration = {
  sizeLayoutConfiguration: SizeLayoutConfigurationDefault,
  positionLayoutConfiguration: PositionLayoutConfigurationDefault,
};
export class LayoutEngine {
  public static readonly RetroFactor: number = Math.round(Math.random() * 2) + 1; //TODO: This is to test stability of my layout engine

  // Properties -----------------------------------
  public get configuration(): LayoutConfiguration {
    return this._configuration;
  }

  // Fields ---------------------------------------
  private _configuration: LayoutConfiguration;

  // Initialization -------------------------------
  constructor(configuration: LayoutConfiguration = LayoutConfigurationDefault) {
    this._configuration = configuration;
  }

  // Methods --------------------------------------
  public screenWidthCurrent(): number {
    return EngineSingleton.instance.screen.resolution.width;
  }
  public screenHeightCurrent(): number {
    return EngineSingleton.instance.screen.resolution.height;
  }

  public screenWidthOriginal(): number {
    return EngineSingleton.instance.screen.canvasWidth;
  }
  public screenHeightOriginal(): number {
    return EngineSingleton.instance.screen.canvasHeight;
  }

  public screenWidthFactor(): number {
    return this.screenWidthCurrent() / this.screenWidthOriginal();
  }
  public screenHeightFactor(): number {
    return this.screenHeightCurrent() / this.screenHeightOriginal();
  }

  public getCalculatedWidth(size?: ISizeable): number {
    let width = -1;

    // Error checking
    this.validateConfiguration(size);
    //

    switch (this._configuration.sizeLayoutConfiguration.relativeTo) {
      case RelativeTo.Screen:
        if (this._configuration.sizeLayoutConfiguration.width.unit === Unit.Percent) {
          //TODO: A better solution is here, but it doesn't work yet.
          let screenWidth = this.screenWidthCurrent();

          width = screenWidth * (this._configuration.sizeLayoutConfiguration.width.value / 100);
          //
        } else if (this._configuration.sizeLayoutConfiguration.width.unit === Unit.Pixel) {
          width = this._configuration.sizeLayoutConfiguration.width.value;
        }
        break;
      case RelativeTo.ImageSource:
        if (size) {
          if (this._configuration.sizeLayoutConfiguration.width.unit === Unit.Percent) {
            width = size.width * (this._configuration.sizeLayoutConfiguration.width.value / 100);
          } else if (this._configuration.sizeLayoutConfiguration.width.unit === Unit.Pixel) {
            width = this._configuration.sizeLayoutConfiguration.width.value;
          }
        }
        break;
      default:
        throw new Error('Invalid relativeTo configuration');
    }

    return width;
  }

  public getCalculatedHeight(size?: ISizeable): number {
    let height = -1;

    // Error checking
    this.validateConfiguration(size);
    //

    switch (this._configuration.sizeLayoutConfiguration.relativeTo) {
      case RelativeTo.Screen:
        if (this._configuration.sizeLayoutConfiguration.height.unit === Unit.Percent) {
          height = this.screenHeightCurrent() * (this._configuration.sizeLayoutConfiguration.height.value / 100);
        } else if (this._configuration.sizeLayoutConfiguration.height.unit === Unit.Pixel) {
          height = this._configuration.sizeLayoutConfiguration.height.value;
        }
        break;
      case RelativeTo.ImageSource:
        if (size) {
          if (this._configuration.sizeLayoutConfiguration.height.unit === Unit.Percent) {
            height = size.height * (this._configuration.sizeLayoutConfiguration.height.value / 100);
          } else if (this._configuration.sizeLayoutConfiguration.height.unit === Unit.Pixel) {
            height = this._configuration.sizeLayoutConfiguration.height.value;
          }
        }
        break;
      default:
        throw new Error('Invalid relativeTo configuration');
    }

    return height;
  }

  public getCalculatedScale(size?: ISizeable): ex.Vector {
    // Error checking
    this.validateConfiguration(size);
    //
    const width = this.getCalculatedWidth(size);
    const height = this.getCalculatedHeight(size);

    switch (this._configuration.sizeLayoutConfiguration.scaleAspectRatio) {
      case ScaleAspectRatio.Ignore:
        return new ex.Vector(width / size!.width, height / size!.height);
      case ScaleAspectRatio.PrioritizeWidth:
        const heightForWidth = width / (size!.width / size!.height);
        return new ex.Vector(width / size!.width, heightForWidth / size!.height);
      case ScaleAspectRatio.PrioritizeHeight:
        const widthForHeight = height * (size!.width / size!.height);
        return new ex.Vector(widthForHeight / size!.width, height / size!.height);
      default:
        throw new Error('Invalid aspect ratio configuration');
    }
  }

  public getCalculatedPosition(size?: ISizeable): ex.Vector {
    let position = new ex.Vector(0, 0);

    if (!this._configuration.positionLayoutConfiguration) {
      return position;
    }

    // Error checking
    this.validateConfiguration(size);
    //

    switch (this._configuration.positionLayoutConfiguration.relativeTo) {
      case RelativeTo.Screen:
        //x
        if (this._configuration.positionLayoutConfiguration.x.unit === Unit.Percent) {
          position.x = this.screenWidthCurrent() * (this._configuration.positionLayoutConfiguration.x.value / 100);
        } else if (this._configuration.positionLayoutConfiguration.x.unit === Unit.Pixel) {
          //TODO: Think about 'what would 'pixel of screen' mean to us here?
          //Maybe this means: relative to the screen upper left, so I guess this is good...yes?
          position.x = this._configuration.positionLayoutConfiguration!.x.value;
        }
        //y
        if (this._configuration.positionLayoutConfiguration.y.unit === Unit.Percent) {
          position.y = this.screenHeightCurrent() * (this._configuration.positionLayoutConfiguration.y.value / 100);
        } else if (this._configuration.positionLayoutConfiguration.y.unit === Unit.Pixel) {
          position.y = this._configuration.positionLayoutConfiguration!.y.value;
        }
        break;
      case RelativeTo.ImageSource:
        if (size) {
          //x
          if (this._configuration.positionLayoutConfiguration.x.unit === Unit.Percent) {
            position.x = size.width * (this._configuration.positionLayoutConfiguration.x.value / 100);
          } else if (this._configuration.positionLayoutConfiguration.x.unit === Unit.Pixel) {
            //TODO: Think about 'what would 'pixel of imageSource' mean to us here?
            //Maybe this is not a common use case and what I have here is good enough?
            position.x = this._configuration.positionLayoutConfiguration!.x.value;
          }
          //y
          if (this._configuration.positionLayoutConfiguration.y.unit === Unit.Percent) {
            position.y = size.height * (this._configuration.positionLayoutConfiguration.y.value / 100);
          } else if (this._configuration.positionLayoutConfiguration.y.unit === Unit.Pixel) {
            //TODO: Think about 'what would 'pixel of imageSource' mean to us here?
            //Maybe this is not a common use case and what I have here is good enough?
            position.y = this._configuration.positionLayoutConfiguration!.y.value;
          }
        }
        break;
      default:
        throw new Error('Invalid relativeTo  configuration');
    }

    return position;
  }

  private validateConfiguration(size?: ISizeable) {
    if (this._configuration.sizeLayoutConfiguration.relativeTo == RelativeTo.ImageSource && !size) {
      throw new Error(`${this.constructor.name}. size is required when relativeTo = ${this._configuration.sizeLayoutConfiguration.relativeTo}`);
    }
  }

  // Event Handlers -------------------------------
}
