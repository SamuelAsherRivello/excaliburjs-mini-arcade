import * as ex from 'excalibur';
import { BackgroundActor as BackgroundActor, BackgroundConfiguration } from '@client/core/engines/excaliburjs/actors/BackgroundActor';
import { MiniGame } from '../../MiniGame';
import { GameState } from '../../concerns/MinGameModel';
import { twentyOneResourceCollection } from './settings/TwentyOneResourceCollection';
import { Deck } from './models/Deck';
import { Player } from './models/Player';
import { DeckActor } from './actors/DeckActor';
import { DealerHandActorConfigurationDefault, HandActor, PlayerHandActorConfigurationDefault } from './actors/HandActor';

export class TwentyOneGame extends MiniGame {
  //Logic

  //Graphics
  private _background!: BackgroundActor;
  private _deckActor!: DeckActor;
  private _playerHandActor!: HandActor;
  private _dealerHandActor!: HandActor;

  constructor() {
    super();
  }

  override async initializeAsync(): Promise<any> {
    if (this.isInitialized) {
      return Promise.resolve();
    }
    //
    await twentyOneResourceCollection.initializeAsync();
    this.start(twentyOneResourceCollection.loader);
    //
    await super.initializeAsync();
    this.initializeBackground();
    this.initializeGame();
    //
    //
    this.model.score.value = 0;
    this.model.lives.value = 3;
    this.model.gameState.value = GameState.GameInitialized;
  }

  private initializeBackground(): void {
    const backgroundConfiguration: BackgroundConfiguration = {
      imageSource: twentyOneResourceCollection.get<ex.ImageSource>('Background01'),
      isScrolling: false,
    };
    this._background = new BackgroundActor(backgroundConfiguration);
    this.currentScene.add(this._background);
  }

  private initializeGame(): void {
    //Deck
    const deck = new Deck();
    this._deckActor = new DeckActor(deck);
    this.currentScene.add(this._deckActor);

    //Logic
    const player = new Player('Player');
    const dealer = new Player('Dealer');

    // Player
    this._playerHandActor = new HandActor(player, PlayerHandActorConfigurationDefault);
    this.currentScene.add(this._playerHandActor);

    //Dealer
    this._dealerHandActor = new HandActor(dealer, DealerHandActorConfigurationDefault);
    this.currentScene.add(this._dealerHandActor);

    //Start
    this.startNewRound();
  }

  private async startNewRound(): Promise<void> {
    //
    this._playerHandActor.clearCardActors();
    this._dealerHandActor.clearCardActors();
    //
    await this.dealCardToPlayer(this._playerHandActor, true);
    await this.dealCardToPlayer(this._dealerHandActor, false);
    await this.dealCardToPlayer(this._playerHandActor, true);
    await this.dealCardToPlayer(this._dealerHandActor, true);
    //
    this.updateScore();
  }

  private async dealCardToPlayer(handActor: HandActor, isFront: boolean): Promise<void> {
    //
    const cardActor = this._deckActor.drawCard(isFront);

    if (cardActor) {
      handActor.addCardActorAsync(cardActor);
    }
  }

  private updateScore(): void {
    this.model.score.value = this._playerHandActor.player.hand.getScore();
  }

  private async dealerTurn(): Promise<void> {
    this._dealerHandActor.cardActors[0].isFront = false; // Flip the face-down card
    while (this._dealerHandActor.player.hand.getScore() < 17) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for animation
      await this.dealCardToPlayer(this._dealerHandActor, true);
    }
  }

  private async endRound(playerWins: boolean): Promise<void> {
    await this.dealerTurn();

    if (playerWins) {
      this.model.lives.value += 1;
    } else {
      this.model.lives.value -= 1;
    }

    if (this.model.lives.value <= 0) {
      this.gameOver();
    } else {
      setTimeout(() => this.startNewRound(), 2000);
    }
  }

  private gameOver(): void {
    console.log('Game Over');
    if (this.model.gameState.value !== GameState.GameEnded) {
      this.model.gameState.value = GameState.GameEnded;
    }
  }

  // Event Handlers -----------------------------------------

  private handlePlayerInput(engine: ex.Engine, delta: number): void {
    if (this.controller.action.wasPressed) {
      this.handlePlayerAction();
    }
  }

  private async handlePlayerAction(): Promise<void> {
    await this.dealCardToPlayer(this._playerHandActor, true);
    this.updateScore();

    if (this._playerHandActor.player.hand.getScore() > 21) {
      this.endRound(false);
    } else if (this._playerHandActor.player.hand.getScore() === 21) {
      this.endRound(true);
    }
  }

  public onPreUpdate(engine: ex.Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    this.handlePlayerInput(engine, delta);
  }

  protected override onModelChanged() {
    if (this.model.lives.value == 0) {
      this.gameOver();
    }
  }
}
