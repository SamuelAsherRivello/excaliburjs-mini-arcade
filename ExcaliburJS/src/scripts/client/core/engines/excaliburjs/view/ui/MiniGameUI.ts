import * as ex from 'excalibur';
import { TextScreenElement } from './TextScreenElement';

export class MiniGameUI extends ex.Actor {
  // Properties -----------------------------------
  public set scoreText(value: string) {
    this._scoreText.text = value;
  }
  public set livesText(value: string) {
    this._livesText.text = value;
  }
  public set buttonsText(value: string) {
    this._buttonsText.text = value;
  }

  // Fields ---------------------------------------
  private _scoreText: TextScreenElement;
  private _livesText: TextScreenElement;
  private _buttonsText: TextScreenElement;
  // Initialization -------------------------------
  constructor(engine: ex.Engine) {
    super();
    this._scoreText = new TextScreenElement(engine);
    this._livesText = new TextScreenElement(engine);
    this._buttonsText = new TextScreenElement(engine);
  }

  onInitialize() {
    this.addChild(this._scoreText);
    this.addChild(this._livesText);
    this.addChild(this._buttonsText);
    this._scoreText.anchorToUpperLeft(30);
    this._livesText.anchorToUpperRight(30);
    this._buttonsText.anchorToLowerLeft(30);
  }

  // Methods --------------------------------------

  // Event Handlers -------------------------------
}
