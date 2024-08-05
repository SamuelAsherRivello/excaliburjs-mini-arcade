import { IInitializableAsync } from '../../core/interfaces/IInitializeAsync';
import { EngineSingleton } from '@client/core/engines/excaliburjs/singletons/EngineSingleton';
import { MiniGameAnimations } from './systems/MiniGameAnimations';
import { MiniGame } from './MiniGame';
/**
 * The main game class with high level logic
 */
export class MiniGameGallery implements IInitializableAsync {
  // Events ---------------------------------------

  // Properties -----------------------------------
  get isInitialized(): boolean {
    return this._isInitialized;
  }

  // Fields ---------------------------------------
  private _isInitialized: boolean = false;
  private _gameIndex: number = 0;
  private _gameCurrent?: MiniGame;
  private _games: (new () => MiniGame)[] = [];
  // Initialization -------------------------------
  constructor() {}

  requireIsInitialized() {
    throw new Error('Method not implemented.');
  }

  public async initializeAsync(): Promise<any> {
    //Super
  }

  // Methods --------------------------------------
  public addGame(gameClass: new () => MiniGame) {
    this._games.push(gameClass);
  }

  public async showNextGameAsync() {
    let nextGameIndex = this._gameIndex + 1;
    if (nextGameIndex >= this._games.length) {
      nextGameIndex = 0;
    }
    await this.loadGameAtIndexAsync(nextGameIndex);
  }

  public async showPreviousGameAsync() {
    let nextGameIndex = this._gameIndex - 1;
    if (nextGameIndex < 0) {
      nextGameIndex = this._games.length - 1;
    }
    await this.loadGameAtIndexAsync(nextGameIndex);
  }

  public async showGameAtIndexAsync(gameIndex: number) {
    await this.loadGameAtIndexAsync(gameIndex);
  }

  private async loadGameAtIndexAsync(gameIndex: number) {
    /////////////////////////
    let canvasElementClone: HTMLCanvasElement | null = null;
    if (this._gameCurrent) {
      console.log('Warning: Disposing an existing game is not working!');
      canvasElementClone = this._gameCurrent.canvas.cloneNode() as HTMLCanvasElement;
      //Dispose of previous game
      this._gameCurrent?.dispose();
    }

    await MiniGameAnimations.awaitTimeAsync(200);

    // Reattach canvas element if it was removed
    if (canvasElementClone) {
      document.body.appendChild(canvasElementClone!);
    }

    /////////////////////////
    //Prep next game
    const gameClass = this._games[gameIndex];
    this._gameCurrent = new gameClass();

    /////////////////////////
    //TODO: Rethink using a singleton?
    //Some reference is indeed needed by LayoutEngine.ts
    EngineSingleton.instance = this._gameCurrent!;

    /////////////////////////
    // Init game
    await this._gameCurrent!.initializeAsync();
  }
  // Event Handlers -------------------------------
}
