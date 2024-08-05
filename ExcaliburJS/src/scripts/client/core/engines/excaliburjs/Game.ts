import { Engine, EngineOptions } from 'excalibur';
import { IInitializableAsync } from '@client/core/interfaces/IInitializeAsync';
import { MiniArcadeAnimations } from '@client/projects/miniArcade/settings/MiniArcadeAnimations';

/**
 * The main game class with high level logic
 *
 */
export class Game extends Engine implements IInitializableAsync {
  // Events ---------------------------------------

  // Properties -----------------------------------

  // Fields ---------------------------------------

  // Initialization -------------------------------
  constructor(engineOptions: EngineOptions) {
    super(engineOptions);
  }
  public initializeAsync(): Promise<any> {
    return MiniArcadeAnimations.awaitNextFrameAsync();
  }
  public requireIsInitialized() {
    if (!this.isInitialized) {
      throw new Error('Error this.isInitialized');
    }
  }

  // Methods --------------------------------------

  // Event Handlers -------------------------------
}
