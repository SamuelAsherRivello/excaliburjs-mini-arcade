import { Engine, EngineOptions } from 'excalibur';
import { IInitializableAsync } from '@client/core/interfaces/IInitializeAsync';
import { MiniGameAnimations } from '@client/projects/miniGameGallery/systems/MiniGameAnimations';

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
    return MiniGameAnimations.awaitNextFrameAsync();
  }
  public requireIsInitialized() {
    if (!this.isInitialized) {
      throw new Error('Error this.isInitialized');
    }
  }

  // Methods --------------------------------------

  // Event Handlers -------------------------------
}
