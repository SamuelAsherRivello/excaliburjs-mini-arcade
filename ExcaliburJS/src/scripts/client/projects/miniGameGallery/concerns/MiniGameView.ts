import * as ex from 'excalibur';
import { MiniGameUI } from '@client/core/engines/excaliburjs/concerns/view/ui/MiniGameUI';
import { BaseView } from '@client/core/engines/excaliburjs/concerns/view/BaseView';

export class MiniGameView extends BaseView {
  // Properties -----------------------------------
  public set score(value: number) {
    const formattedScore = value.toString().padStart(3, '0');
    this._ui.scoreText = `Score: ${formattedScore}​`;
  }

  public set lives(value: number) {
    value = Math.max(0, value);
    const filledHeart = '❤️';
    const emptyHeart = '🖤';
    const maxLives = 3;

    const filledHearts = filledHeart.repeat(value);
    const emptyHearts = emptyHeart.repeat(Math.max(0, maxLives - value));
    const formattedLives = filledHearts + emptyHearts;
    this._ui.livesText = `Lives: ${formattedLives}`;
  }

  // Fields ---------------------------------------
  private _ui: MiniGameUI;

  // Initialization -------------------------------
  constructor(engine: ex.Engine) {
    super();
    this._ui = new MiniGameUI(engine);
  }

  onInitialize() {
    this.addChild(this._ui);
    this._ui.buttonsText = `⬅️⬆️​​➡️​🟦​, F, R​`;
  }

  // Methods --------------------------------------

  // Event Handlers -------------------------------
}
