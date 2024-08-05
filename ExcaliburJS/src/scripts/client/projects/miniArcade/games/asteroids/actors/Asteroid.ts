import * as ex from 'excalibur';
import { asteroidsResourceCollection } from '../settings/AsteroidsResourceCollection';
import { MiniArcadeAnimations } from '../../../settings/MiniArcadeAnimations';
import { ActorAdvanced, ActorConfiguration } from '@client/core/engines/excaliburjs/actors/ActorAdvanced';
import { RelativeTo, ScaleAspectRatio, Unit } from '@client/core/engines/excaliburjs/layout/LayoutEngine';

export interface AsteroidConfiguration extends ActorConfiguration {
  velocity: ex.Vector;
  generation: number;
  onAddedCallback: (asteroid: Asteroid) => void;
}

export const AsteroidConfigurationDefault: AsteroidConfiguration = {
  pos: new ex.Vector(100, 100),
  velocity: new ex.Vector(5, 5),
  onAddedCallback: (asteroid: Asteroid) => {},
  generation: 3,
  imageSource: asteroidsResourceCollection.get<ex.ImageSource>('Asteroid01'),
  layoutConfiguration: {
    sizeLayoutConfiguration: {
      width: { value: 30, unit: Unit.Percent },
      height: { value: 30, unit: Unit.Percent },
      relativeTo: RelativeTo.Screen,
      scaleAspectRatio: ScaleAspectRatio.PrioritizeWidth,
    },
  },
};

export class Asteroid extends ActorAdvanced {
  // Properties -----------------------------------
  public override get configuration(): AsteroidConfiguration {
    return this._configuration as AsteroidConfiguration;
  }

  public get generation() {
    return this._generation;
  }
  // Fields ----------------------------------------
  private readonly RotationSpeed: number = Math.random() * 0.001 - 0.003;
  private readonly MaxGeneration: number = 3;
  private _generation: number;
  private _onAddedCallback: (asteroid: Asteroid) => void;

  // Static -------------------------------
  public static createAndAdd(engine: ex.Engine, count: number, generation: number, onAddedCallback: (asteroid: Asteroid) => void, position?: ex.Vector) {
    for (let i = 0; i < count; i++) {
      const newPosition = position || new ex.Vector(Math.random() * engine.drawWidth, Math.random() * engine.drawHeight);
      const newVelocity = new ex.Vector(Math.random() * 100 - 50, Math.random() * 100 - 50);

      const asteroidConfiguation: AsteroidConfiguration = AsteroidConfigurationDefault;
      asteroidConfiguation.pos = newPosition;
      asteroidConfiguation.velocity = newVelocity;
      asteroidConfiguation.generation = generation;
      asteroidConfiguation.onAddedCallback = onAddedCallback;
      //
      const asteroid = new Asteroid(asteroidConfiguation);
      engine.add(asteroid);
      if (asteroid._onAddedCallback) {
        asteroid._onAddedCallback(asteroid);
      }
    }
  }

  // Initialization -------------------------------
  constructor(configuration: AsteroidConfiguration) {
    //
    configuration = { ...AsteroidConfigurationDefault, ...configuration };
    super(configuration);
    //

    // Set values
    this.pos = configuration.pos!;
    this.vel = configuration.velocity;
    this._generation = configuration.generation;
    this._onAddedCallback = configuration.onAddedCallback;
    this.body.useGravity = false;
  }

  async onInitialize(engine: ex.Engine) {
    const sprite = this.configuration.imageSource!.toSprite();
    const scaleOffsetByGeneration = this._generation / this.MaxGeneration;
    sprite.scale = this.layoutEngine.getCalculatedScale(this.configuration.imageSource).scale(scaleOffsetByGeneration);
    this.graphics.use(sprite);

    const radiusFactor = 0.5; // Make smaller
    this.collider.set(
      new ex.CircleCollider({
        radius: Math.max(sprite.width / 2, sprite.height / 2) * radiusFactor,
      }),
    );

    await MiniArcadeAnimations.scaleUpAndFadeUpAsync(this);
  }

  onPreUpdate(engine: ex.Engine, delta: number): void {
    // Rotate the asteroid
    this.rotation += this.RotationSpeed;

    // Wrap around screen
    this.pos = new ex.Vector((this.pos.x + engine.drawWidth) % engine.drawWidth, (this.pos.y + engine.drawHeight) % engine.drawHeight);
  }

  public async takeDamage(engine: ex.Engine) {
    //50% chance to spawn next generation
    if (this._generation > 1 && Math.round(Math.random() * 2) === 1) {
      Asteroid.createAndAdd(engine, 3, this._generation - 1, this._onAddedCallback, new ex.Vector(this.pos.x, this.pos.y));
    }

    this.actions.clearActions();
    await MiniArcadeAnimations.scaleDownAndFadeDownAsync(this);
    this.kill();
  }
}
