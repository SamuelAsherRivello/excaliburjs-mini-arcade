import * as ex from 'excalibur';
import { breakoutResourceCollection } from './settings/BreakoutResourceCollection';
import { BackgroundActor } from '@client/core/engines/excaliburjs/actors/BackgroundActor';
import { BreakoutPlayer } from './actors/BreakoutPlayer';
import { TileLevel } from './actors/TileLevel';
import { MiniGame } from '../../MiniGame';

export class BreakoutGame extends MiniGame {
  // Events ---------------------------------------

  // Properties -----------------------------------

  // Fields ---------------------------------------
  private _player!: BreakoutPlayer;
  private _background!: ex.Actor;
  private _tileLevel!: TileLevel;

  // Initialization -------------------------------
  constructor() {
    super();
  }

  // Methods --------------------------------------
  override async initializeAsync(): Promise<any> {
    if (this.isInitialized) {
      return Promise.resolve();
    }

    await breakoutResourceCollection.initializeAsync();
    this.start(breakoutResourceCollection.loader);

    await super.initializeAsync();
    this.initializeBackground();
    this.initializeLevel();
    this.initializePlayer();

    // Set Values
    this.model.score.value = 0;
    this.model.lives.value = 3;
  }

  onPreUpdate(engine: ex.Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    this.handlePlayerInput(engine, delta);
  }

  // Helper Methods -------------------------------
  private initializeBackground(): void {
    this._background = new BackgroundActor({
      imageSource: breakoutResourceCollection.get<ex.ImageSource>('Background02'),
    });
    this.currentScene.add(this._background);
  }

  private initializeLevel(): void {
    this._tileLevel = new TileLevel({
      width: this.screen.resolution.width,
      height: this.screen.resolution.height,
    });
    this.currentScene.add(this._tileLevel);
  }

  private initializePlayer(): void {
    this._player = new BreakoutPlayer();
    this._player.pos.x = this.screen.resolution.width / 2;
    this._player.pos.y = this.screen.resolution.height - 100;
    this.currentScene.add(this._player);
  }

  private handlePlayerInput(engine: ex.Engine, delta: number): void {
    if (this.controller.left.wasPressed) {
      breakoutResourceCollection.get<ex.Sound>('Hit01').play();
    } else if (this.controller.right.wasPressed) {
      breakoutResourceCollection.get<ex.Sound>('Hit01').play();
    }

    if (this.controller.left.wasReleased) {
      breakoutResourceCollection.get<ex.Sound>('Hit01').play();
    } else if (this.controller.right.wasReleased) {
      breakoutResourceCollection.get<ex.Sound>('Hit01').play();
    }

    if (this.controller.left.isHeld) {
      this._player.move(engine, delta, new ex.Vector(-1, 0));
      //
      this.model.score.value += 1;
      //
    } else if (this.controller.right.isHeld) {
      this._player.move(engine, delta, new ex.Vector(1, 0));
      //
      this.model.score.value += 1;
      //
    }

    if (this.controller.action.wasPressed) {
      //
      breakoutResourceCollection.get<ex.Sound>('Hit01').play();
    }
  }

  // Event Handlers -------------------------------
  protected override onModelChanged() {
    if (this.model.lives.value == 0) {
      console.log('Gameover');
    }
  }
}
