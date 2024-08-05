import * as ex from 'excalibur';
import { TrafficLane } from './TrafficLane';
import { froggerResourceCollection } from '../settings/FroggerResourceCollection';
import { ImageSource } from 'excalibur';
import { FrogPlayer } from './FrogPlayer';

// New Level class
export class TrafficLevel extends ex.Actor {
  private readonly _distanceGapY: number = FrogPlayer.DistancePerJump;
  constructor(config: { width: number; height: number }) {
    super({
      width: config.width,
      height: config.height,

      collisionType: ex.CollisionType.PreventCollision,
    });
  }

  onInitialize(engine: ex.Engine) {
    this.addCars();
    this.addLogs();
  }

  addCars() {
    const lowestY = this.height - 360;

    const cars: ImageSource[] = [froggerResourceCollection.get<ex.ImageSource>('Car01'), froggerResourceCollection.get<ex.ImageSource>('Car02')];

    cars.forEach((car, index) => {
      {
        const trafficLane = new TrafficLane({
          imageSource: car,
          width: this.width,
          height: this._distanceGapY,
          color: new ex.Color(100, 100, 100, 0.3),
          pos: ex.vec(0, lowestY - 2 * this._distanceGapY * index),
        });
        this.addChild(trafficLane);
      }
    });
  }

  addLogs() {
    const lowestY = this.height - 560;

    const cars: ImageSource[] = [
      froggerResourceCollection.get<ex.ImageSource>('Log01'),
      froggerResourceCollection.get<ex.ImageSource>('Log02'),
      froggerResourceCollection.get<ex.ImageSource>('Log01'),
      froggerResourceCollection.get<ex.ImageSource>('Log01'),
      froggerResourceCollection.get<ex.ImageSource>('Log02'),
    ];

    cars.forEach((car, index) => {
      {
        const trafficLane = new TrafficLane({
          imageSource: car,
          width: this.width,
          height: this._distanceGapY,
          color: new ex.Color(100, 100, 100, 0.3),
          pos: ex.vec(0, lowestY - this._distanceGapY * index),
        });
        this.addChild(trafficLane);
      }
    });
  }
}
