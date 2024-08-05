import * as ex from 'excalibur';
import { TrafficItem } from './TrafficItem';
import { ImageSource } from 'excalibur';

export class TrafficLane extends ex.Actor {
  private _imageSource: ImageSource;
  constructor(config: { width: number; height: number; pos: ex.Vector; imageSource: ex.ImageSource; color?: ex.Color }) {
    super({
      width: config.width,
      height: config.height,
      pos: config.pos,
      color: config.color,
      collisionType: ex.CollisionType.PreventCollision,
    });
    this._imageSource = config.imageSource;
  }

  onInitialize(engine: ex.Engine) {
    const numberOfItems = 3;
    const itemWidth = 80;
    const itemHeight = this.height;
    const spacing = this.width / numberOfItems;
    const direction: number = Math.random() > 0.5 ? 1 : -1;
    const speed = Math.random() * 50 + 50; // Random speed between 50 and 100

    for (let i = 0; i < numberOfItems; i++) {
      //leave a gap
      if (Math.random() > 0.8) {
        continue;
      }
      let startX: number;
      if (direction > 0) {
        startX = i * spacing - this.width;
      } else {
        startX = i * spacing;
      }

      const trafficItem = new TrafficItem({
        width: itemWidth,
        height: itemHeight,
        imageSource: this._imageSource,
        pos: ex.vec(startX, 0),
        direction,
        speed,
        laneWidth: this.width,
      });
      this.addChild(trafficItem);
    }
  }
}
