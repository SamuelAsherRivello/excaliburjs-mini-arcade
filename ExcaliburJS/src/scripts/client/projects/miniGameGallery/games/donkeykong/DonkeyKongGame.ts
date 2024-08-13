import * as ex from 'excalibur';
import { donkeyKongResourceCollection } from './settings/DonkeyKongResourceCollection';
import { BackgroundActor, BackgroundConfiguration } from '@client/core/engines/excaliburjs/actors/BackgroundActor';
import { MiniGame } from '../../MiniGame';
import { GameState } from '../../concerns/MinGameModel';
import { DonkeyKongPlayer } from './actors/DonkeyKongPlayer';
import { DonkeyKongPlatform } from './actors/DonkeyKongPlatform';
import { MiniGameAnimations } from '../../systems/MiniGameAnimations';

export class DonkeyKongGame extends MiniGame {
  // Events ---------------------------------------

  // Properties -----------------------------------

  // Fields ---------------------------------------
  private _player!: DonkeyKongPlayer;
  private _platforms: DonkeyKongPlatform[] = [];
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

    await donkeyKongResourceCollection.initializeAsync();
    this.start(donkeyKongResourceCollection.loader);

    await super.initializeAsync();
    await this.initializeBackground();
    await this.initializeLevel();
    await this.initializePlayer();

    await MiniGameAnimations.awaitNextFrameAsync();
    this._player.body.collisionType = ex.CollisionType.Active;
    this._player.body.friction = 1;
    this._player.body.limitDegreeOfFreedom = [ex.DegreeOfFreedom.Rotation];

    // Set Values
    this.model.score.value = 0;
    this.model.lives.value = 3;
    this.model.gameState.value = GameState.GameInitialized;
  }

  private initializeBackground(): void {
    const backgroundConfiguration: BackgroundConfiguration = {
      imageSource: donkeyKongResourceCollection.get<ex.ImageSource>('Background01'),
      isScrolling: false,
    };
    this._background = new BackgroundActor(backgroundConfiguration);
    this.currentScene.add(this._background);
  }

  private async initializeLevel(): Promise<void> {
    ///////////////////////////////
    //Tilted platforms
    this._platforms.push(new DonkeyKongPlatform({ rotation: 0.1 }));
    this._platforms.push(new DonkeyKongPlatform({ rotation: -0.1 }));
    this._platforms.push(new DonkeyKongPlatform({ rotation: 0.1 }));
    this._platforms.push(new DonkeyKongPlatform({ rotation: -0.1 }));

    this._platforms.forEach(async (platform, index) => {
      this.currentScene.add(platform);
    });

    const positionYTop = 0.2;
    const positionYGap = 0.2;

    await MiniGameAnimations.awaitNextFrameAsync();
    this._platforms.forEach(async (platform, index) => {
      platform.pos.y = this.drawHeight * (positionYTop + positionYGap * index);
    });

    ///////////////////////////////
    //Flat platform
    // const flat = new DonkeyKongPlatform({ rotation: 0 });
    // this.currentScene.add(flat);
    // await MiniGameAnimations.awaitNextFrameAsync();
    // flat.pos.y = this.drawHeight * 0.9;
  }

  private async initializePlayer() {
    this._player = new DonkeyKongPlayer();
    this.currentScene.add(this._player);
  }

  private handlePlayerInput(engine: ex.Engine, delta: number): void {
    if ((this._player.canMove && this.controller.left.wasPressed) || this.controller.right.wasPressed) {
      this.controller.up.wasPressed || this.controller.down.wasPressed || this._player.move(engine, delta, new ex.Vector(0, 1));
      donkeyKongResourceCollection.get<ex.Sound>('Hit01').play();
    }

    if (this._player.canMove && this.controller.left.isHeld) {
      this._player.move(engine, delta, new ex.Vector(-1, 0));
    } else if (this._player.canMove && this.controller.right.isHeld) {
      this._player.move(engine, delta, new ex.Vector(1, 0));
    }

    if (this._player.canJump && this.controller.up.isHeld) {
      this._player.jump(engine, delta, new ex.Vector(0, -1));

      //TODO: up a ladder
    } else if (this.controller.down.isHeld) {
      //TODO: up a ladder
    }

    if (this.controller.action.wasPressed) {
      //
      donkeyKongResourceCollection.get<ex.Sound>('Hit01').play();
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
