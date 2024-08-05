import * as ex from 'excalibur';

export class LerpUtility {
  public static lerpVector(start: ex.Vector, end: ex.Vector, t: number): ex.Vector {
    return new ex.Vector(start.x + (end.x - start.x) * t, start.y + (end.y - start.y) * t);
  }
}
