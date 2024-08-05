import * as ex from 'excalibur';

export class MiniGameBehaviors {
  // Methods --------------------------------------

  /**
   * @param target
   * @param engine
   * @param isFullyOffscreen True, wrap if any pixels are off screen. False, wrap if the entire actor is off screen.
   */
  public static setPositionWrapAroundScreen(target: ex.Actor, engine: ex.Engine, isFullyOffscreen: boolean) {
    const anchorOffsetX = target.anchor.x * target.width;
    const anchorOffsetY = target.anchor.y * target.height;

    if (isFullyOffscreen) {
      let newX = target.pos.x;
      let newY = target.pos.y;

      if (target.pos.x - anchorOffsetX + target.width < 0) {
        newX = engine.drawWidth + anchorOffsetX;
      } else if (target.pos.x - anchorOffsetX > engine.drawWidth) {
        newX = -target.width + anchorOffsetX;
      }

      if (target.pos.y - anchorOffsetY + target.height < 0) {
        newY = engine.drawHeight + anchorOffsetY;
      } else if (target.pos.y - anchorOffsetY > engine.drawHeight) {
        newY = -target.height + anchorOffsetY;
      }

      if (target.pos != new ex.Vector(newX, newY)) {
        target.pos = new ex.Vector(newX, newY);
      }
    } else {
      let newX = target.pos.x;
      let newY = target.pos.y;

      if (target.pos.x - anchorOffsetX < 0) {
        newX = engine.drawWidth + anchorOffsetX;
      } else if (target.pos.x - anchorOffsetX > engine.drawWidth) {
        newX = -anchorOffsetX;
      }

      if (target.pos.y - anchorOffsetY < 0) {
        newY = engine.drawHeight + anchorOffsetY;
      } else if (target.pos.y - anchorOffsetY > engine.drawHeight) {
        newY = -anchorOffsetY;
      }

      target.pos = new ex.Vector(newX, newY);
    }
  }
}
