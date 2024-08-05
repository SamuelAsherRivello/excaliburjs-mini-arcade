import * as ex from 'excalibur';
import { LayoutConfiguration, LayoutEngine, RelativeTo, ScaleAspectRatio, Unit } from '../../layout/LayoutEngine';

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
  private readonly MarginTop = 40; // Why must these change?
  private readonly MarginLeft = 40; // Why must these change?
  private readonly MarginBottom = 20; // Why must these change?
  private _layoutEngine: LayoutEngine;

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
    });

    label.anchor = ex.vec(0, 0);
    label.pos = ex.vec(0, 0);
    super();

    const configuration = {
      sizeLayoutConfiguration: {
        width: { value: 10, unit: Unit.Percent },
        height: { value: 10, unit: Unit.Percent },
        relativeTo: RelativeTo.Screen,
        scaleAspectRatio: ScaleAspectRatio.PrioritizeWidth,
      },
      positionLayoutConfiguration: {
        x: { value: 50, unit: Unit.Pixel },
        y: { value: 50, unit: Unit.Pixel },
        relativeTo: RelativeTo.Screen,
      },
    };

    this._layoutEngine = new LayoutEngine(configuration);

    this._engine = engine;
    this._label = label;
  }

  onInitialize() {
    this.addChild(this._label);

    // this.scale = this._layoutEngine.getCalculatedScale(this);
    // this.pos = this._layoutEngine.getCalculatedPosition(this);
  }

  // Methods --------------------------------------
  public anchorToUpperLeft(margin: number) {
    //TODO: why is the "20" needed
    this._label.font.textAlign = ex.TextAlign.Left;
    this.pos = ex.vec(this._label.width / 2 + margin, this._label.height + this.MarginTop + margin);
  }

  public anchorToUpperRight(margin: number) {
    //TODO: why is the "20" needed
    this._label.font.textAlign = ex.TextAlign.Right;
    this.pos = ex.vec(this._engine.drawWidth - this._label.width / 2 - margin, -2 + this._label.height + this.MarginTop + margin);
  }

  public anchorToLowerLeft(margin: number) {
    //TODO: why is the "10" needed
    this._label.font.textAlign = ex.TextAlign.Left;
    this.pos = ex.vec(this._label.width / 2 + margin, this._engine.drawHeight - this.MarginBottom - margin);
  }

  public anchorToLowerRight(margin: number) {
    //TODO: why is the "10" needed
    this._label.font.textAlign = ex.TextAlign.Right;
    this.pos = ex.vec(this._engine.drawWidth - this._label.width / 2 - margin, this._engine.drawHeight - this.MarginBottom - margin);
  }

  public anchorToCenter(margin: number) {
    //TODO: why is the "20" needed
    this._label.font.textAlign = ex.TextAlign.Center;
    this.pos = ex.vec(this._engine.drawWidth / 2 + this._label.width / 2, this._engine.drawHeight / 2 - this._label.height / 2);
  }

  // Event Handlers -------------------------------
}
