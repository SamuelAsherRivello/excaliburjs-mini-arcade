import { FontSource, ImageFiltering, ImageSource, Sound } from 'excalibur';

//
import Paddle01 from '@assets/images/itch.io/breakout/Paddle01.png';
import Ball01 from '@assets/images/itch.io/breakout/Ball01.png';
import Tile01 from '@assets/images/itch.io/breakout/Tile01.png';
import Tile02 from '@assets/images/itch.io/breakout/Tile02.png';
import Tile03 from '@assets/images/itch.io/breakout/Tile03.png';
import Background02 from '@assets/images/itch.io/asteroids/Background02.png';
import Hit01 from '@assets/audio/sfx/Hit01.wav';
import Britanic from '@assets/fonts/Britanic.ttf';
import { ResourceCollection } from '@client/core/engines/excaliburjs/resources/ResourceCollection';

//
// Flexible API: Pass string or import as arg #1
const rc = new ResourceCollection();
rc.add(Paddle01, new ImageSource(Paddle01));
rc.add(Ball01, new ImageSource(Ball01));
rc.add(Tile01, new ImageSource(Tile01));
rc.add(Tile02, new ImageSource(Tile02));
rc.add(Tile03, new ImageSource(Tile03));
rc.add(Background02, new ImageSource(Background02));
//
rc.add(Hit01, new Sound(Hit01));
//
rc.add(
  Britanic,
  new FontSource(Britanic, 'Britanic', {
    filtering: ImageFiltering.Pixel,
    size: 18,
  }),
);

//
export const breakoutResourceCollection = rc;
