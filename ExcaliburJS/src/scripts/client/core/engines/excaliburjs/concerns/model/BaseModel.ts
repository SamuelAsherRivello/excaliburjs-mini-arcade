import { IInitializableAsync } from '@client/core/interfaces/IInitializeAsync';

export abstract class BaseModel implements IInitializableAsync {
  // Properties -----------------------------------
  get isInitialized(): boolean {
    return this._isInitialized;
  }

  // Fields ---------------------------------------
  private _isInitialized: boolean = false;

  // Initialization -------------------------------
  public async initializeAsync(): Promise<any> {
    if (this.isInitialized) {
      return Promise.resolve();
    }
    this._isInitialized = true;
  }
  public requireIsInitialized() {
    if (!this.isInitialized) {
      throw new Error('Error this.isInitialized');
    }
  }
  // Methods --------------------------------------
  // Event Handlers -------------------------------
}
