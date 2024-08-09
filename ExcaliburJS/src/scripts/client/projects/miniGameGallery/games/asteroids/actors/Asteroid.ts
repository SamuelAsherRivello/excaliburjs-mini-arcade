import * as ex from 'excalibur';
import { asteroidsResourceCollection } from '../settings/AsteroidsResourceCollection';
import { MiniGameAnimations } from '../../../systems/MiniGameAnimations';
import { ActorAdvanced, ActorConfiguration } from '@client/core/engines/excaliburjs/actors/ActorAdvanced';
import { RelativeTo, ScaleAspectRatio, Unit } from '@client/core/engines/excaliburjs/layout/LayoutEngine';
import { IDestroyable } from '@client/core/interfaces/IDestroyable';
import { MiniGameBehaviors } from '@client/projects/miniGameGallery/systems/MiniGameBehaviors';
import { IHealth } from '@client/core/interfaces/IHealth';
import { ObservableValue } from '@client/core/observables/ObservableValue';
import { config } from 'process';
import { EngineSingleton } from '@client/core/engines/excaliburjs/singletons/EngineSingleton';
import { MiniGameParticles } from '@client/projects/miniGameGallery/systems/MiniGameParticles';

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

export class Asteroid extends ActorAdvanced implements IDestroyable, IHealth {
  // Properties -----------------------------------
  public override get configuration(): AsteroidConfiguration {
    return this._configuration as AsteroidConfiguration;
  }

  get health(): ObservableValue<number> {
    return this._health;
  }

  public get generation() {
    return this._generation;
  }

  public get isDestroying(): boolean {
    return this._isDestroying;
  }

  // Fields ----------------------------------------
  public static readonly AsteroidMaxGeneration: number = 3;
  public static readonly AsteroidCountInitial: number = 3;
  public static readonly HealthInitial: number = 100;
  public static readonly HealthDelta: number = Asteroid.HealthInitial;
  //
  private readonly RotationSpeed: number = Math.random() * 0.001 - 0.003;
  private _isDestroying: boolean = false;
  private _generation: number;
  private _health: ObservableValue<number> = new ObservableValue<number>(Asteroid.HealthInitial);
  private _onAddedCallback: (asteroid: Asteroid) => void;
  // Static -------------------------------
  public static createAndAdd(engine: ex.Engine, count: number, generation: number, onAddedCallback: (asteroid: Asteroid) => void, position?: ex.Vector) {
    for (let i = 0; i < count; i++) {
      //
      const newPosition = position || new ex.Vector(Math.random() * engine.drawWidth, Math.random() * engine.drawHeight);
      const newVelocity = new ex.Vector(Math.random() * 100 - 50, Math.random() * 100 - 50);

      const asteroidConfiguation: AsteroidConfiguration = AsteroidConfigurationDefault;
      asteroidConfiguation.pos = newPosition;
      asteroidConfiguation.velocity = newVelocity;
      asteroidConfiguation.generation = generation;
      asteroidConfiguation.onAddedCallback = onAddedCallback;
      const asteroid = new Asteroid(asteroidConfiguation);
      asteroid.name = 'Asteroid';
      engine.add(asteroid);
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

    this.body.useGravity = false;
    //
    this._onAddedCallback = configuration.onAddedCallback;
    this._onAddedCallback(this);
    this._health.onValueChanged.addEventListener(this.health_onValueChanged.bind(this));
  }

  public async onInitialize(engine: ex.Engine) {
    const sprite = this.configuration.imageSource!.toSprite();
    const scaleOffsetByGeneration = this._generation / Asteroid.AsteroidMaxGeneration;
    sprite.scale = this.layoutEngine.getCalculatedScale(this.configuration.imageSource).scale(scaleOffsetByGeneration);
    this.graphics.use(sprite);

    const radiusFactor = 0.5; // Make smaller
    this.collider.set(
      new ex.CircleCollider({
        radius: Math.max(sprite.width / 2, sprite.height / 2) * radiusFactor,
      }),
    );

    this.actions.clearActions();
    await MiniGameAnimations.scaleUpAndFadeUpAsync(this);
  }

  public onPreUpdate(engine: ex.Engine, delta: number): void {
    // Rotate the asteroid
    this.rotation += this.RotationSpeed;
    this.setPositionWrapAroundScreen(engine);
  }
  public setPositionWrapAroundScreen(engine: ex.Engine<any>) {
    MiniGameBehaviors.setPositionWrapAroundScreen(this, engine, true);
  }

  public async destroy() {
    // Prep
    this._isDestroying = true; //Useful for turning off any movement
    this.vel = ex.vec(0, 0);
    this.collider.clear();

    // Create more
    if (this._generation > 1 && Math.round(Math.random() * 2) === 1) {
      Asteroid.createAndAdd(EngineSingleton.instance, 3, this._generation - 1, this._onAddedCallback, this.pos);
    }

    // Wait
    this.actions.clearActions();
    MiniGameParticles.particlesAddDustAsync(this, { duration: 100 });
    await MiniGameAnimations.scaleDownAndFadeDownAsync(this, { duration: 100 });

    // Result
    this.onDestroyComplete();
  }

  // Event Handlers -------------------------------
  public health_onValueChanged(previousValue: number, currentValue: number) {
    if (currentValue <= 0) {
      this.destroy();
    }
  }

  public onDestroyComplete() {
    this.kill();
  }
}
