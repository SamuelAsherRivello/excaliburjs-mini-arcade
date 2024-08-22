import { HTMLElementButton } from '@client/core/htmlElements/HtmlElementButton';
import { HTMLElementPrompt } from '@client/core/htmlElements/HtmlElementPrompt';
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
  /**
   * LOW-LEVEL PROMPT: More power
   */
  protected createHTMLElementPrompt(title: string, body: string, buttons: HTMLElementButton[]): HTMLElementPrompt {
    const htmlElementPrompt: HTMLElementPrompt = new HTMLElementPrompt(title, body, buttons);
    return htmlElementPrompt;
  }

  // Event Handlers -------------------------------
}
