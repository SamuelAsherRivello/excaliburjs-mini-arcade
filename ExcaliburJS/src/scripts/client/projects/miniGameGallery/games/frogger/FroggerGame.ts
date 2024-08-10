import * as ex from 'excalibur';
import { FrogPlayer } from './actors/FrogPlayer';
import { froggerResourceCollection } from './settings/FroggerResourceCollection';
import { BackgroundActor } from '@client/core/engines/excaliburjs/actors/Background';
import { TrafficLevel } from './actors/TrafficLevel';
import { MiniGame } from '../../MiniGame';

export class FroggerGame extends MiniGame {
  // Events ---------------------------------------

  // Properties -----------------------------------

  // Fields ---------------------------------------
  private _player!: FrogPlayer;
  private _background!: ex.Actor;
  private _level!: TrafficLevel;

  // Initialization -------------------------------
  constructor() {
    super();
  }

  // Methods --------------------------------------
  override async initializeAsync(): Promise<any> {
    if (this.isInitialized) {
      return Promise.resolve();
    }

    await froggerResourceCollection.initializeAsync();
    this.start(froggerResourceCollection.loader);

    await super.initializeAsync();

    this.initializeBackground();
    this.initializeLevel();
    this.initializePlayer();

    // Set Values
    this.model.score.value = 0;
    this.model.lives.value = 3;
  }

  private initializeBackground(): void {
    this._background = new BackgroundActor({
      imageSource: froggerResourceCollection.get<ex.ImageSource>('Background01'),
    });
    this.currentScene.add(this._background);
  }

  private initializeLevel(): void {
    this._level = new TrafficLevel({
      width: this.screen.resolution.width,
      height: this.screen.resolution.height,
    });
    this._level.pos.x = this.screen.resolution.width / 2;
    this._level.pos.y = this.screen.resolution.height / 2;
    this.currentScene.add(this._level);
  }

  private initializePlayer(): void {
    this._player = new FrogPlayer();
    this._player.pos.x = this.screen.resolution.width / 2;
    this._player.pos.y = this.screen.resolution.height - 50;
    this.currentScene.add(this._player);
    this._player.z = 10000;
  }

  private handlePlayerInput(engine: ex.Engine, delta: number): void {
    if (this.controller.left.wasPressed) {
      this._player.move(engine, delta, new ex.Vector(-1, 0));
      froggerResourceCollection.get<ex.Sound>('Hit01').play();
    } else if (this.controller.right.wasPressed) {
      this._player.move(engine, delta, new ex.Vector(1, 0));
      froggerResourceCollection.get<ex.Sound>('Hit01').play();
    } else if (this.controller.up.wasPressed) {
      this._player.move(engine, delta, new ex.Vector(0, -1));
      froggerResourceCollection.get<ex.Sound>('Hit01').play();
    } else if (this.controller.down.wasPressed) {
      this._player.move(engine, delta, new ex.Vector(0, 1));
      froggerResourceCollection.get<ex.Sound>('Hit01').play();
    }

    if (this.controller.action.wasPressed) {
      // Action button logic here
    }
  }

  // Event Handlers -------------------------------
  onPreUpdate(engine: ex.Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    this.handlePlayerInput(engine, delta);
  }

  protected override onModelChanged() {
    if (this.model.lives.value == 0) {
      console.log('Gameover');
    }
  }
}
