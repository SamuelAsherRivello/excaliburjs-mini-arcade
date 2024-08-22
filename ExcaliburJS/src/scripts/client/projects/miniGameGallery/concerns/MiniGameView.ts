import * as ex from 'excalibur';
import { MiniGameUI } from '@client/core/engines/excaliburjs/concerns/view/ui/MiniGameUI';
import { BaseView } from '@client/core/engines/excaliburjs/concerns/view/BaseView';
import { HTMLElementButton } from '@client/core/htmlElements/HtmlElementButton';
import { HTMLElementPrompt } from '@client/core/htmlElements/HtmlElementPrompt';
import { EngineSingleton } from '@client/core/engines/excaliburjs/singletons/EngineSingleton';

export class MiniGameView extends BaseView {
  // Properties -----------------------------------
  public set score(value: number) {
    const formattedScore = value.toString().padStart(3, '0');
    this._ui.textUpperLeft = `Score: ${formattedScore}​`;
  }

  public set lives(value: number) {
    value = Math.max(0, value);
    const filledHeart = '❤️';
    const emptyHeart = '🖤';
    const maxLives = 3;

    const filledHearts = filledHeart.repeat(value);
    const emptyHearts = emptyHeart.repeat(Math.max(0, maxLives - value));
    const formattedLives = filledHearts + emptyHearts;
    this._ui.textUpperRight = `Lives: ${formattedLives}`;
  }

  public set buttons(value: string) {
    this._ui.textLowerLeft = value;
  }

  public set status(value: string) {
    this._ui.textCenter = value;
  }

  // Fields ---------------------------------------
  private _ui: MiniGameUI;

  // Initialization -------------------------------
  constructor(engine: ex.Engine) {
    super();
    this._ui = new MiniGameUI(engine);
  }

  public override async initializeAsync(): Promise<any> {
    super.initializeAsync();
    //TODO: Set this per-game for unique inputs
    this.buttons = `⬅️⬆️​​➡️​🟦​, F, R​`;
    this.status = '';
  }

  onInitialize() {
    this.addChild(this._ui);
  }

  // Methods --------------------------------------

  /**
   * HIGH-LEVEL PROMPT: More easy
   */
  public createMiniGamePrompt(gameTitle: string, promptBody: string, onConfirmClick: (arg0: HTMLElementButton) => void): HTMLElementPrompt {
    //
    return this.createHTMLElementPrompt(`MiniGame - ${gameTitle}`, promptBody, [new HTMLElementButton('Ok', onConfirmClick)]);
  }

  public addHTMLElementPrompt(htmlElementPrompt: HTMLElementPrompt) {
    // Animate
    const useAnimation = false;
    if (useAnimation) {
      htmlElementPrompt.classList.add('fade-in');
    }

    EngineSingleton.instance.canvas.parentElement!.appendChild(htmlElementPrompt);
  }

  public removeHTMLElementPrompt(htmlElementPrompt: HTMLElementPrompt) {
    // Animate
    const useAnimation = false;
    if (useAnimation) {
      // Wait
      htmlElementPrompt.addEventListener('transitionend', () => {
        if (htmlElementPrompt.parentNode) {
          htmlElementPrompt.parentNode.removeChild(htmlElementPrompt);
        }
      });

      // Animate
      htmlElementPrompt.classList.add('fade-out');
    } else {
      htmlElementPrompt?.parentNode?.removeChild(htmlElementPrompt);
    }
  }

  // Event Handlers -------------------------------
}
