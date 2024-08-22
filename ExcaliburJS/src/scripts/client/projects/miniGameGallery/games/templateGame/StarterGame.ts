import * as ex from 'excalibur';
import { starterResourceCollection } from './settings/StarterResourceCollection';
import { BackgroundActor, BackgroundConfiguration } from '@client/core/engines/excaliburjs/actors/BackgroundActor';
import { StarterPlayer } from './actors/StarterPlayer';
import { MiniGame } from '../../MiniGame';
import { GameState } from '../../concerns/MinGameModel';
import { MiniGamePostProcessors } from '../../systems/MiniGamePostProcessors';
import { HTMLElementPrompt } from '@client/core/htmlElements/HtmlElementPrompt';
import { HTMLElementButton } from '@client/core/htmlElements/HtmlElementButton';

export class StarterGame extends MiniGame {
  // Events ---------------------------------------

  // Properties -----------------------------------

  // Fields ---------------------------------------
  private _player!: StarterPlayer;
  private _background!: BackgroundActor;
  private _gameStartPrompt!: HTMLElementPrompt;
  private _gameEndPrompt!: HTMLElementPrompt;

  // Initialization -------------------------------
  constructor() {
    super();
  }

  // Methods --------------------------------------
  override async initializeAsync(): Promise<any> {
    //Wait
    if (this.isInitialized) {
      return Promise.resolve();
    }

    // Load Assets
    await starterResourceCollection.initializeAsync();
    this.start(starterResourceCollection.loader);

    //Post Processing
    const postProcessor: ex.PostProcessor = MiniGamePostProcessors.getPostProcessor_GrayScale();
    //this.graphicsContext.addPostProcessor(postProcessor);

    //Initialize
    await super.initializeAsync();
    this.model.gameState.value = GameState.GameInitializing;
  }

  private initializeBackground(): void {
    if (this._background) {
      this._background.kill();
    }
    const backgroundConfiguration: BackgroundConfiguration = {
      imageSource: starterResourceCollection.get<ex.ImageSource>('Background01'),
      isScrolling: false,
    };
    this._background = new BackgroundActor(backgroundConfiguration);
    this.currentScene.add(this._background);
  }

  private handlePlayerInput(engine: ex.Engine, delta: number): void {
    if (this.model.gameState.value != GameState.GameStarted) {
      return;
    }

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

  private createGameStartPrompt() {
    //
    const gameTitle: string = this.constructor.name;

    let promptBody: string = '';
    promptBody += 'Welcome to starter game! ';
    promptBody += '\n\n';
    promptBody += 'Use arrow keys to move.';
    promptBody += '\n\n';
    promptBody += 'Move to win. ';
    promptBody += 'Mouse-click to die. ';

    //
    this._gameStartPrompt = this.view.createMiniGamePrompt(gameTitle, promptBody, this.onGameStartPromptConfirm.bind(this));
    this.view.addHTMLElementPrompt(this._gameStartPrompt);
  }

  private createGameEndPrompt() {
    //
    const gameTitle: string = this.constructor.name;

    let promptBody: string = '';
    promptBody += 'You won/lost the game!';
    promptBody += '\n\n';
    promptBody += 'Play again?';
    //
    this._gameEndPrompt = this.view.createMiniGamePrompt(gameTitle, promptBody, this.onGameEndPromptConfirm.bind(this));
    this.view.addHTMLElementPrompt(this._gameEndPrompt);
  }

  // Event Handlers -------------------------------
  public onPreUpdate(engine: ex.Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    this.handlePlayerInput(engine, delta);
  }

  /**
   * MODEL CHANGE: Anything....
   */
  protected override onModelChanged() {
    //Override and use this if you want to do something when any part of the model changes
    //Or override and use the specific model change events below
  }

  /**
   * MODEL CHANGE: Score....
   */
  protected override model_Score_onValueChanged(previousValue: number, currentValue: number) {
    // Super
    super.model_Score_onValueChanged(previousValue, currentValue);

    // Local
  }

  /**
   * MODEL CHANGE: Lives....
   */
  protected model_Lives_onValueChanged(previousValue: number, currentValue: number): void {
    // Super
    super.model_Lives_onValueChanged(previousValue, currentValue);

    if (this.model.gameState.value != GameState.GameStarted) {
      return;
    }

    // Local
    if (this.model.lives.value == 0) {
      this.model.gameState.value = GameState.GameEnding;
    }
  }

  /**
   * MODEL CHANGE: GameState....
   */
  protected model_GameState_onValueChanged(previousValue: GameState, currentValue: GameState): void {
    // Super
    super.model_GameState_onValueChanged(previousValue, currentValue);

    // Local
    console.log('GameState: ' + GameState[currentValue]);

    switch (currentValue) {
      case GameState.GameInitializing:
        this.initializeBackground();

        // Set Values
        // Advance to next state
        this.model.gameState.value = GameState.GameInitialized;
        break;
      case GameState.GameInitialized:
        // UI
        this.createGameStartPrompt();

        // Model
        this.model.score.value = 0;
        this.model.lives.value = 3;

        // Layout
        if (this._player) {
          this._player.kill();
        }
        this._player = new StarterPlayer();
        this.currentScene.add(this._player);

        // Wait for prompt click to advance state
        break;
      case GameState.GameStarting:
        // Advance to next state
        this.model.gameState.value = GameState.GameStarted;
        break;
      case GameState.GameStarted:
        //
        //
        // Here the game is running...
        //
        //
        break;
      case GameState.GameEnding:
        // UI
        this.createGameEndPrompt();

        // Advance to next state
        this.model.gameState.value = GameState.GameEnded;
        break;
      case GameState.GameEnded:
        // Wait for prompt click to advance state
        break;
    }
  }

  protected onGameStartPromptConfirm(button: HTMLElementButton): void {
    if (this.model.gameState.value == GameState.GameInitialized) {
      this.view.removeHTMLElementPrompt(this._gameStartPrompt);
      this.model.gameState.value = GameState.GameStarting;
    }
  }

  protected onGameEndPromptConfirm(button: HTMLElementButton): void {
    if (this.model.gameState.value == GameState.GameEnded) {
      this.view.removeHTMLElementPrompt(this._gameEndPrompt);
      this.model.gameState.value = GameState.GameInitializing;
    }
  }
}
