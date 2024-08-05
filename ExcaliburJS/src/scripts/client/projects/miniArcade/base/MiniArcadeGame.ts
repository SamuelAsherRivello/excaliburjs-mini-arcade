import { Game } from '@client/core/engines/excaliburjs/Game';
import * as ex from 'excalibur';
import { MiniArcadeView } from './MiniArcadeView';
import { MiniArcadeModel } from './MiniArcadeModel';
import { MiniArcadeController } from './MiniArcadeController';
import { LayoutEngine } from '@client/core/engines/excaliburjs/layout/LayoutEngine';

/**
 * The main game class with high level logic
 */
export class MiniArcadeGame extends Game {
  // Events ---------------------------------------

  // Properties -----------------------------------
  protected get model(): MiniArcadeModel {
    return this._model;
  }

  protected get view(): MiniArcadeView {
    return this._view;
  }
  protected get controller(): MiniArcadeController {
    return this._controller;
  }

  // Fields ---------------------------------------
  private _view!: MiniArcadeView;
  private _model!: MiniArcadeModel;
  private _controller!: MiniArcadeController;

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
      maxFps: 120,
      physics: {
        solver: ex.SolverStrategy.Arcade,
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

    //Model
    this._model = new MiniArcadeModel();
    await this._model.initializeAsync();

    //View
    this._view = new MiniArcadeView(this);
    await this._view.initializeAsync();
    this.currentScene.add(this._view);

    //Events, TODO: move up a litte?
    this._model.score.onValueChanged.addEventListener(this.model_Score_onValueChanged.bind(this));
    this._model.lives.onValueChanged.addEventListener(this.model_Lives_onValueChanged.bind(this));

    //Controller
    this._controller = new MiniArcadeController();
    await this._controller.initializeAsync();

    //
    await this._model.initializeAsync();
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
      console.log('todo: make reset');
    }
  }

  protected checkGameOver() {
    //must override
  }

  // Event Handlers -------------------------------
  private model_Score_onValueChanged(previousValue: number, currentValue: number) {
    this._view.score = currentValue;
    this.checkGameOver();
  }

  private model_Lives_onValueChanged(previousValue: number, currentValue: number): void {
    this._view.lives = currentValue;
    this.checkGameOver();
  }
}
