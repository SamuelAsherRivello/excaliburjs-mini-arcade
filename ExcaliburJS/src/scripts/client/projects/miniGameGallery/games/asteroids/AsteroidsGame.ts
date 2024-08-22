import * as ex from 'excalibur';
import {
  BackgroundActor as BackgroundActor,
  BackgroundConfiguration,
  BackgroundConfigurationDefault,
} from '@client/core/engines/excaliburjs/actors/BackgroundActor';
import { AsteroidsPlayer, AsteroidsPlayerConfigurationDefault } from './actors/AsteroidsPlayer';
import { Asteroid } from './actors/Asteroid';
import { asteroidsResourceCollection } from './settings/AsteroidsResourceCollection';
import { MiniGame } from '../../MiniGame';
import { ObservableValue } from '@client/core/observables/ObservableValue';
import { GameState } from '../../concerns/MinGameModel';

export class AsteroidsGame extends MiniGame {
  // Events ---------------------------------------

  // Properties -----------------------------------

  // Fields ---------------------------------------
  private _background!: BackgroundActor;
  private _player!: AsteroidsPlayer;
  //
  private _asteroidCount: ObservableValue<number> = new ObservableValue<number>(0);

  // Initialization -------------------------------
  constructor() {
    super();
  }

  // Methods --------------------------------------
  override async initializeAsync(): Promise<any> {
    if (this.isInitialized) {
      return Promise.resolve();
    }

    // Load
    await asteroidsResourceCollection.initializeAsync();
    this.start(asteroidsResourceCollection.loader);

    // Init
    await super.initializeAsync();
    this.initializeBackgrounds();
    this.initializePlayer();
    this.initializeAsteroids();

    // Listen
    this._asteroidCount.onValueChanged.addEventListener(this.onModelChanged.bind(this));

    // Set Values
    this.model.score.value = 0;
    this.model.lives.value = 3;
    this.model.gameState.value = GameState.GameInitialized;
  }

  // Helper Methods -------------------------------
  private initializeBackgrounds(): void {
    const backgroundConfiguration: BackgroundConfiguration = {
      imageSource: asteroidsResourceCollection.get<ex.ImageSource>('Background02'),
      isScrolling: true,
      scrollVelocity: ex.vec(15, 30),
    };
    this._background = new BackgroundActor(backgroundConfiguration);
    this.currentScene.add(this._background);
  }

  private initializePlayer(): void {
    this._player = new AsteroidsPlayer(AsteroidsPlayerConfigurationDefault);
    this.currentScene.add(this._player);

    this._player.on('collisionend', () => {
      this.model.lives.value--;
    });
  }

  private initializeAsteroids() {
    Asteroid.createAndAdd(this, Asteroid.AsteroidCountInitial, Asteroid.AsteroidMaxGeneration, this.asteroid_onCreate.bind(this));
  }

  private handlePlayerInput(engine: ex.Engine, delta: number): void {
    if (!this._player) {
      return;
    }
    if (this.controller.left.isHeld) {
      this._player.rotate(engine, delta, -1);
    } else if (this.controller.right.isHeld) {
      this._player.rotate(engine, delta, 1);
    } else {
      this._player.rotate(engine, delta, 0);
    }

    if (this.controller.up.isHeld) {
      this._player.move(engine, delta);
    }

    if (this.controller.action.wasPressed) {
      this._player.shoot(engine, delta);
    }
  }

  // Event Handlers -------------------------------
  public onPreUpdate(engine: ex.Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    this.handlePlayerInput(engine, delta);
  }

  protected override onModelChanged() {
    if (this.model.gameState.value === GameState.GameInitialized) {
      console.log(`GameState: ${GameState[this.model.gameState.value]}`);
      this.model.gameState.value = GameState.GameRunning;
      console.log(`GameState: ${GameState[this.model.gameState.value]}`);
    }

    if (this.model.gameState.value === GameState.GameRunning) {
      if (this.model.lives.value == 0) {
        console.log('No Lives');
        this.model.gameState.value = GameState.GameEnded;
        console.log(`GameState: ${GameState[this.model.gameState.value]}`);
      }

      if (this._asteroidCount.value == 0) {
        console.log('No Asteroids');
        this.model.gameState.value = GameState.GameEnded;
        console.log(`GameState: ${GameState[this.model.gameState.value]}`);
      }
    }

    if (this.model.gameState.value === GameState.GameEnded) {
      //Game over here...
    }
  }

  private asteroid_onCreate(asteroid: Asteroid) {
    this._asteroidCount.value++;

    asteroid.on('postkill', () => {
      this._asteroidCount.value--;
      this.model.score.value += 10 * asteroid.generation;
    });
  }
}
