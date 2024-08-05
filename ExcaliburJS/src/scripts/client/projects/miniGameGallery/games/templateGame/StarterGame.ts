import * as ex from 'excalibur';
import { starterResourceCollection } from './settings/StarterResourceCollection';
import { Background, BackgroundConfiguration } from '@client/core/engines/excaliburjs/actors/Background';
import { StarterPlayer } from './actors/StarterPlayer';
import { MiniGame } from '../../MiniGame';

export class StarterGame extends MiniGame {
  // Events ---------------------------------------

  // Properties -----------------------------------

  // Fields ---------------------------------------
  private _player!: StarterPlayer;
  private _background!: Background;

  // Initialization -------------------------------
  constructor() {
    super();
  }

  // Methods --------------------------------------
  override async initializeAsync(): Promise<any> {
    if (this.isInitialized) {
      return Promise.resolve();
    }

    await starterResourceCollection.initializeAsync();
    this.start(starterResourceCollection.loader);

    await super.initializeAsync();
    this.initializeBackground();
    this.initializePlayer();

    // Set Values
    this.model.score.value = 0;
    this.model.lives.value = 3;
  }

  onPreUpdate(engine: ex.Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    this.handlePlayerInput(engine, delta);
  }

  protected override onModelChanged() {
    if (this.model.lives.value <= 0) {
      this.model.lives.value = 0;
      console.log('Gameover');
    }
  }

  // Event Handlers -------------------------------

  // Helper Methods -------------------------------
  private initializeBackground(): void {
    const backgroundConfiguration: BackgroundConfiguration = {
      imageSource: starterResourceCollection.get<ex.ImageSource>('Background01'),
      isScrolling: false,
    };
    this._background = new Background(backgroundConfiguration);
    this.currentScene.add(this._background);
  }

  private initializePlayer(): void {
    this._player = new StarterPlayer();
    this._player.pos.x = this.screen.resolution.width / 2;
    this._player.pos.y = this.screen.resolution.height / 2;
    this.currentScene.add(this._player);
  }

  private handlePlayerInput(engine: ex.Engine, delta: number): void {
    if (this.controller.left.wasPressed) {
      this._player.move(engine, delta, new ex.Vector(-1, 0));
      //
      starterResourceCollection.get<ex.Sound>('Hit01').play();
      //
      this.model.score.value += 1;
      //
    } else if (this.controller.right.wasPressed) {
      this._player.move(engine, delta, new ex.Vector(1, 0));
      //
      starterResourceCollection.get<ex.Sound>('Hit01').play();
      //
      this.model.score.value += 1;
      //
    } else if (this.controller.up.wasPressed) {
      this._player.move(engine, delta, new ex.Vector(0, -1));
      //
      starterResourceCollection.get<ex.Sound>('Hit01').play();
      //
      this.model.score.value += 1;
      //
    } else if (this.controller.down.wasPressed) {
      this._player.move(engine, delta, new ex.Vector(0, 1));
      //
      starterResourceCollection.get<ex.Sound>('Hit01').play();
      //
      this.model.score.value += 1;
      //
    }

    if (this.controller.action.wasPressed) {
      //
      starterResourceCollection.get<ex.Sound>('Hit01').play();
      //
      this.model.lives.value -= 1;
      //
    }
  }
}
