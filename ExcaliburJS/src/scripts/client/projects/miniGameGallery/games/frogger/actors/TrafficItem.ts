import { SpriteUtility } from '@client/core/engines/excaliburjs/utilities/SpriteUtility';
import * as ex from 'excalibur';

export class TrafficItem extends ex.Actor {
  private direction: number;
  private speed: number;
  private _imageSource: ex.ImageSource;
  private laneWidth: number;

  constructor(config: { width: number; height: number; pos: ex.Vector; direction: number; imageSource: ex.ImageSource; speed: number; laneWidth: number }) {
    super({
      width: config.width,
      height: config.height,
      pos: config.pos,
      color: new ex.Color(100, 20, 20, 1),
      collisionType: ex.CollisionType.Active,
    });
    this.direction = config.direction;
    this._imageSource = config.imageSource;
    this.speed = config.speed;
    this.laneWidth = config.laneWidth;
  }

  onInitialize(engine: ex.Engine) {
    let sprite = this._imageSource.toSprite();
    sprite = SpriteUtility.resizeSpriteWithin(sprite, this.width, this.height);
    this.graphics.use(sprite);
  }

  onPreUpdate(engine: ex.Engine, delta: number) {
    this.pos.x += (this.direction * this.speed * delta) / 1000;

    // Wrap based on lane width, with adjustments
    const buffer = this.width + 100; // Add a buffer equal to the item's width

    if (this.direction > 0) {
      if (this.pos.x > this.laneWidth + buffer) {
        this.pos.x = -this.width - buffer;
      }
    } else {
      if (this.pos.x < -this.width - buffer) {
        this.pos.x = this.laneWidth + buffer;
      }
    }
  }
}
