import * as ex from 'excalibur';
import { starterResourceCollection } from './settings/StarterResourceCollection';
import { BackgroundActor, BackgroundConfiguration } from '@client/core/engines/excaliburjs/actors/Background';
import { StarterPlayer } from './actors/StarterPlayer';
import { MiniGame } from '../../MiniGame';
import { GameState } from '../../concerns/MinGameModel';
import { MiniGamePostProcessors } from '../../systems/MiniGamePostProcessors';

export class StarterGame extends MiniGame {
  // Events ---------------------------------------

  // Properties -----------------------------------

  // Fields ---------------------------------------
  private _player!: StarterPlayer;
  private _background!: BackgroundActor;

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
    this.model.gameState.value = GameState.GameInitialized;

    //POST PROCESSING
    const postProcessor: ex.PostProcessor = MiniGamePostProcessors.getPostProcessor_GrayScale();
    //this.graphicsContext.addPostProcessor(postProcessor);
  }

  private initializeBackground(): void {
    const backgroundConfiguration: BackgroundConfiguration = {
      imageSource: starterResourceCollection.get<ex.ImageSource>('Background01'),
      isScrolling: false,
    };
    this._background = new BackgroundActor(backgroundConfiguration);
    this.currentScene.add(this._background);
  }

  private initializePlayer(): void {
    this._player = new StarterPlayer();
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

  // Event Handlers -------------------------------
  public onPreUpdate(engine: ex.Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    this.handlePlayerInput(engine, delta);
  }

  protected override onModelChanged() {
    if (this.model.lives.value == 0) {
      console.log('Gameover');
    }
  }
}
