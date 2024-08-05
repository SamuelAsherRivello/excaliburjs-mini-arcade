import { IInitializableAsync } from '@client/core/interfaces/IInitializeAsync';
import * as ex from 'excalibur';

export abstract class BaseView extends ex.Actor implements IInitializableAsync {
  // Properties -----------------------------------
  // Fields ---------------------------------------

  // Initialization -------------------------------
  public async initializeAsync(): Promise<any> {
    if (this.isInitialized) {
      return Promise.resolve();
    }
  }
  public requireIsInitialized() {
    if (!this.isInitialized) {
      throw new Error('Error this.isInitialized');
    }
  }
  // Methods --------------------------------------
  // Event Handlers -------------------------------
}
