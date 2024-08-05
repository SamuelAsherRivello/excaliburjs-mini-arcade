import { BaseModel } from '@client/core/engines/excaliburjs/model/BaseModel';
import { IInitializableAsync } from '@client/core/interfaces/IInitializeAsync';
import { ObservableValue } from '@client/core/observables/ObservableValue';

export class MiniArcadeModel extends BaseModel implements IInitializableAsync {
  // Properties -----------------------------------
  public get score(): ObservableValue<number> {
    return this._score;
  }

  public get lives(): ObservableValue<number> {
    return this._lives;
  }

  // Fields ---------------------------------------
  private _score: ObservableValue<number> = new ObservableValue(0);
  private _lives: ObservableValue<number> = new ObservableValue(0);

  // Initialization -------------------------------
  public async initializeAsync(): Promise<any> {
    //Super
    await super.initializeAsync();

    //Local
    this._score.value = 0; //Set to non-zero from some other game class
    this._lives.value = 0;

    this._score.refreshValueChanged(); //force refresh to initial value
    this._lives.refreshValueChanged();
  }

  // Methods --------------------------------------
  // Event Handlers -------------------------------
}
