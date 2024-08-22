import { Game } from '@client/core/engines/excaliburjs/Game';
import * as ex from 'excalibur';
import { GameState, MiniGameModel } from './concerns/MinGameModel';
import { MiniGameView } from './concerns/MiniGameView';
import { MiniGameController } from './concerns/MiniGameController';
import { LayoutEngine } from '@client/core/engines/excaliburjs/layout/LayoutEngine';

/**
 * The main game class with high level logic
 */
export class MiniGame extends Game {
  // Events ---------------------------------------

  // Properties -----------------------------------
  protected get model(): MiniGameModel {
    return this._model;
  }

  protected get view(): MiniGameView {
    return this._view;
  }
  protected get controller(): MiniGameController {
    return this._controller;
  }

  // Fields ---------------------------------------
  private _view!: MiniGameView;
  private _model!: MiniGameModel;
  private _controller!: MiniGameController;
  public static readonly GravityY = 1000;

  // Initialization -------------------------------
  constructor() {
    //1 HD, 2 SD, 3 Retro

    //
    console.log('retroFactor', LayoutEngine.RetroFactor);
    const engineOptions: ex.EngineOptions = {
      canvasElementId: 'excaliburjs-game-canvas',
      width: 900 / LayoutEngine.RetroFactor,
      height: 1600 / LayoutEngine.RetroFactor,
      displayMode: ex.DisplayMode.FitContainer,
      fixedUpdateFps: 30,
      maxFps: 120,
      physics: {
        enabled: true,
        solver: ex.SolverStrategy.Realistic,
        gravity: ex.vec(0, MiniGame.GravityY),
      },
      antialiasing: {
        pixelArtSampler: true, // turns on the sub-pixel shader for pixel art
        nativeContextAntialiasing: false, // turns off canvas aa
        multiSampleAntialiasing: true, // turns on msaa which smooths quad boundaries
        filtering: ex.ImageFiltering.Pixel, // hints the image loader to use pixel filtering
        canvasImageRendering: 'auto', // applies the 'auto'-matic css to the canvas CSS image-rendering
      },
      suppressPlayButton: true,
    };

    super(engineOptions);
  }

  override async initializeAsync(): Promise<any> {
    //Super
    await super.initializeAsync();

    //View
    this._view = new MiniGameView(this);
    await this._view.initializeAsync();
    this.currentScene.add(this._view);

    //Controller
    this._controller = new MiniGameController();
    await this._controller.initializeAsync();

    //Model
    this._model = new MiniGameModel();
    await this._model.initializeAsync();
    this._model.score.onValueChanged.addEventListener(this.model_Score_onValueChanged.bind(this));
    this._model.lives.onValueChanged.addEventListener(this.model_Lives_onValueChanged.bind(this));
    this._model.gameState.onValueChanged.addEventListener(this.model_GameState_onValueChanged.bind(this));
  }

  public override onPreUpdate(engine: ex.Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    this.controller.update(engine, delta);

    if (this.controller.fullScreen.wasPressed) {
      if (engine.screen.isFullScreen) {
        engine.screen.exitFullScreen();
      } else {
        engine.screen.goFullScreen();
      }
    }

    if (this.controller.resetGame.wasPressed) {
      //TODO: reload THE GAME instead of reloading THE PAGE
      location.reload();
    }
  }

  protected onModelChanged() {
    //must override
  }

  // Event Handlers -------------------------------
  protected model_Score_onValueChanged(previousValue: number, currentValue: number) {
    this._view.score = currentValue;
    this.onModelChanged();
  }

  protected model_Lives_onValueChanged(previousValue: number, currentValue: number): void {
    this._view.lives = currentValue;
    this.onModelChanged();
  }

  protected model_GameState_onValueChanged(previousValue: GameState, currentValue: GameState): void {
    this.onModelChanged();
  }
}
