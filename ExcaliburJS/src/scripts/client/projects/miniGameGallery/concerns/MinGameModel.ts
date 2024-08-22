import { BaseModel } from '@client/core/engines/excaliburjs/concerns/model/BaseModel';
import { IInitializableAsync } from '@client/core/interfaces/IInitializeAsync';
import { ObservableValue } from '@client/core/observables/ObservableValue';

export enum GameState {
  None,
  GameInitializing,
  GameInitialized,
  GameStarting,
  GameStarted,
  GameEnding,
  GameEnded,
}
export class MiniGameModel extends BaseModel implements IInitializableAsync {
  // Properties -----------------------------------
  public get score(): ObservableValue<number> {
    return this._score;
  }

  public get lives(): ObservableValue<number> {
    return this._lives;
  }

  public get gameState(): ObservableValue<GameState> {
    return this._gameState;
  }

  // Fields ---------------------------------------
  private _score: ObservableValue<number> = new ObservableValue(0);
  private _lives: ObservableValue<number> = new ObservableValue(0);
  private _gameState: ObservableValue<GameState> = new ObservableValue(GameState.None);

  // Initialization -------------------------------
  public async initializeAsync(): Promise<any> {
    //Super
    await super.initializeAsync();

    //Local

    //NOTE: Later, set to non-zero from some game-specific class
    this._score.value = -1;
    this._lives.value = -1;

    //NOTE: Force refresh to initial value
    this._score.refreshValueChanged();
    this._lives.refreshValueChanged();
  }

  // Methods --------------------------------------
  // Event Handlers -------------------------------
}
