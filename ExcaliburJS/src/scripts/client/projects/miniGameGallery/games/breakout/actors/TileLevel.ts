import * as ex from 'excalibur';
import { breakoutResourceCollection } from '../settings/BreakoutResourceCollection';
import { ImageSource } from 'excalibur';
import { Tile, TileConfigurationDefault } from './Tile';
import { LayoutEngine, RelativeTo, ScaleAspectRatio, Unit } from '@client/core/engines/excaliburjs/layout/LayoutEngine';
import { MiniGameAnimations } from '../../../systems/MiniGameAnimations';

export class TileLevel extends ex.Actor {
  constructor(config: { width: number; height: number }) {
    super({
      width: config.width,
      height: config.height,
      collisionType: ex.CollisionType.PreventCollision,
    });
  }

  onInitialize(engine: ex.Engine) {
    this.addTiles(engine);
  }

  addTiles(engine: ex.Engine) {
    const tileImages: ImageSource[] = [
      breakoutResourceCollection.get<ex.ImageSource>('Tile01'),
      breakoutResourceCollection.get<ex.ImageSource>('Tile02'),
      breakoutResourceCollection.get<ex.ImageSource>('Tile03'),
    ];

    const screenWidth = engine.screen.drawWidth;
    const screenHeight = engine.screen.drawHeight;

    const marginX = 0.3;
    const startX = screenWidth * marginX;
    const endX = screenWidth * (1 - marginX);
    const startY = screenHeight * 0.2;
    const endY = screenHeight * 0.5;

    let x = startX;
    let y = startY;

    let tile: Tile;
    let index = 0;
    while (y <= endY) {
      while (x <= endX) {
        index = index + 1;
        const tileImage = tileImages[Math.floor(Math.random() * tileImages.length)];
        tile = new Tile({ imageSource: tileImage });
        tile.pos = new ex.Vector(x, y);

        this.addChild(tile);
        x += tile.width;

        // Fade in
        const tileForAsync = tile;
        tile.graphics.opacity = 0;
        MiniGameAnimations.callAfterFrame(tileForAsync, this.tileEntrance.bind(this, tileForAsync, index));
      }
      x = startX;
      y += tile!.width / (384 / 128); //TODO: Works, but I'd like to use tile.height. Not working???
    }
  }
  private async tileEntrance(tile: Tile, index: number) {
    await MiniGameAnimations.scaleUpAndFadeUpAsync(tile, { duration: 100, delay: 3 * index });
  }
}
