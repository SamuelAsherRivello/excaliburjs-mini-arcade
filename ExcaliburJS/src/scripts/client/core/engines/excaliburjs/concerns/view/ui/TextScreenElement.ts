import * as ex from 'excalibur';
import { LayoutEngine, Unit, RelativeTo, ScaleAspectRatio } from '../../../layout/LayoutEngine';

export class TextScreenElement extends ex.ScreenElement {
  // Properties -----------------------------------
  public get text(): string {
    return this._label.text;
  }
  public set text(text: string) {
    this._label.text = text;
  }
  // Fields ---------------------------------------
  private _label: ex.Label;
  private _layoutEngine: LayoutEngine;

  override get width(): number {
    return this._layoutEngine.getCalculatedWidth();
  }

  override get height(): number {
    return this._layoutEngine.getCalculatedHeight();
  }

  // Initialization -------------------------------
  constructor(engine: ex.Engine) {
    const label = new ex.Label({
      text: '',
      font: new ex.Font({
        size: 20 + 10 / LayoutEngine.RetroFactor,
        color: ex.Color.White,
        unit: ex.FontUnit.Px,
        family: 'Britanic',
        style: ex.FontStyle.Normal,
        bold: false,
        textAlign: ex.TextAlign.Left,
        baseAlign: ex.BaseAlign.Alphabetic,
        direction: ex.Direction.LeftToRight,
        shadow: {
          blur: 2,
          offset: ex.vec(1, 1),
          color: ex.Color.Blue,
        },
      }),
      anchor: ex.vec(0, 0),
    });

    label.anchor = ex.vec(0, 0);
    label.pos = ex.vec(0, 0);
    super();

    const configuration = {
      //Arbitrary values, but works well!
      //Make each textfield 50% of the screen width and 4% of the screen height
      sizeLayoutConfiguration: {
        width: { value: 50, unit: Unit.Percent },
        height: { value: 4, unit: Unit.Percent },
        relativeTo: RelativeTo.Screen,
        scaleAspectRatio: ScaleAspectRatio.PrioritizeWidth,
      },
    };

    this._layoutEngine = new LayoutEngine(configuration);

    this._engine = engine;
    this._label = label;
  }

  onInitialize() {
    this.addChild(this._label);
  }

  // Methods --------------------------------------
  public anchorToUpperLeft(marginPercent: number) {
    //
    this._label.font.textAlign = ex.TextAlign.Left;
    //
    const margin = this.getMarginPercent(marginPercent);
    //
    this.pos = ex.vec(margin, this.height + margin);
  }

  public anchorToUpperRight(marginPercent: number) {
    //
    this._label.font.textAlign = ex.TextAlign.Right;
    //
    const margin = this.getMarginPercent(marginPercent);
    //
    this.pos = ex.vec(this._layoutEngine.screenWidthCurrent() - margin, this.height + margin);
  }

  public anchorToLowerLeft(marginPercent: number) {
    //
    this._label.font.textAlign = ex.TextAlign.Left;
    //
    const margin = this.getMarginPercent(marginPercent);
    //
    this.pos = ex.vec(this._label.width / 2 + margin, this._layoutEngine.screenHeightCurrent() - this.height / 2 - margin);
  }

  public anchorToLowerRight(marginPercent: number) {
    //
    this._label.font.textAlign = ex.TextAlign.Right;
    //
    const margin = this.getMarginPercent(marginPercent);
    //
    this.pos = ex.vec(this._layoutEngine.screenWidthCurrent() - this._label.width / 2 - margin, this._layoutEngine.screenHeightCurrent() - margin);
  }

  public anchorToCenter(marginPercent: number) {
    //
    this._label.font.textAlign = ex.TextAlign.Center;
    //
    const margin = this.getMarginPercent(marginPercent);
    //
    this.pos = ex.vec(this._layoutEngine.screenWidthCurrent() / 2, this._layoutEngine.screenHeightCurrent() / 2 - this.height);
  }

  //TODO: I don't love this calculation, but it works for now
  private getMarginPercent(marginPercent: number): number {
    return this._layoutEngine.screenWidthCurrent() * marginPercent;
  }

  // Event Handlers -------------------------------
}
