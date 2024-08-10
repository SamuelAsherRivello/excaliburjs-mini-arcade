import * as ex from 'excalibur';
import { TextScreenElement } from './TextScreenElement';

export class MiniGameUI extends ex.Actor {
  // Properties -----------------------------------
  public set textUpperLeft(value: string) {
    this._textUpperLeft.text = value;
    this._textUpperLeft.anchorToUpperLeft(MiniGameUI.MarginPercent);
  }
  public set textUpperRight(value: string) {
    this._textUpperRight.text = value;
    this._textUpperRight.anchorToUpperRight(MiniGameUI.MarginPercent);
  }
  public set textLowerLeft(value: string) {
    this._textLowerLeft.text = value;
    this._textLowerLeft.anchorToLowerLeft(MiniGameUI.MarginPercent);
  }
  public set textCenter(value: string) {
    this._textCenter.text = value;
    this._textCenter.anchorToCenter(0);
  }

  // Fields ---------------------------------------
  private static readonly MarginPercent = 0.02;
  private _textUpperLeft: TextScreenElement;
  private _textUpperRight: TextScreenElement;
  private _textLowerLeft: TextScreenElement;
  private _textCenter: TextScreenElement;

  // Initialization -------------------------------
  constructor(engine: ex.Engine) {
    super();
    this._textUpperLeft = new TextScreenElement(engine);
    this._textUpperRight = new TextScreenElement(engine);
    this._textLowerLeft = new TextScreenElement(engine);
    this._textCenter = new TextScreenElement(engine);
  }

  onInitialize() {
    this.addChild(this._textUpperLeft);
    this.addChild(this._textUpperRight);
    this.addChild(this._textLowerLeft);
    this.addChild(this._textCenter);
  }

  // Methods --------------------------------------

  // Event Handlers -------------------------------
}
