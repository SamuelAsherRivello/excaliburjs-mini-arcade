import * as ex from 'excalibur';
import { Background as Background, BackgroundConfiguration, BackgroundConfigurationDefault } from '@client/core/engines/excaliburjs/actors/Background';
import { AsteroidsPlayer, AsteroidsPlayerConfigurationDefault } from './actors/AsteroidsPlayer';
import { Asteroid } from './actors/Asteroid';
import { asteroidsResourceCollection } from './settings/AsteroidsResourceCollection';
import { MiniGame } from '../../MiniGame';

export class AsteroidsGame extends MiniGame {
  // Events ---------------------------------------

  // Properties -----------------------------------

  // Fields ---------------------------------------
  private _background!: Background;
  private _player!: AsteroidsPlayer;

  // Initialization -------------------------------
  constructor() {
    super();
  }

  // Methods --------------------------------------
  override async initializeAsync(): Promise<any> {
    if (this.isInitialized) {
      return Promise.resolve();
    }

    await asteroidsResourceCollection.initializeAsync();
    this.start(asteroidsResourceCollection.loader);

    await super.initializeAsync();
    //
    this.initializeBackgrounds();
    this.initializePlayer();
    this.initializeAsteroids();
    // Set Values
    this.model.score.value = 0;
    this.model.lives.value = 3;
  }

  onPreUpdate(engine: ex.Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    this.handlePlayerInput(engine, delta);
  }

  // Helper Methods -------------------------------
  private initializeBackgrounds(): void {
    const backgroundConfiguration: BackgroundConfiguration = {
      imageSource: asteroidsResourceCollection.get<ex.ImageSource>('Background02'),
      isScrolling: true,
      scrollVelocity: ex.vec(15, 30),
    };
    this._background = new Background(backgroundConfiguration);
    this.currentScene.add(this._background);
  }

  private initializePlayer(): void {
    this._player = new AsteroidsPlayer(AsteroidsPlayerConfigurationDefault);
    this.currentScene.add(this._player);
  }

  private initializeAsteroids() {
    Asteroid.createAndAdd(this, 3, 3, this.asteroid_onCreate.bind(this));
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

  protected override checkGameOver() {
    if (this.model.lives.value <= 0) {
      console.log('Gameover');
    }
  }

  // Event Handlers -------------------------------

  private asteroid_onCreate(asteroid: Asteroid) {
    asteroid.on('kill', () => {
      this.model.score.value += 10 * asteroid.generation;
    });
  }
}
