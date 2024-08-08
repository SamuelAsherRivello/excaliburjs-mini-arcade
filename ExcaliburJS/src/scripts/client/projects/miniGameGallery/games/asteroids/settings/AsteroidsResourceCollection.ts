import { FontSource, ImageFiltering, ImageSource, Sound } from 'excalibur';
import { ResourceCollection } from '@client/core/engines/excaliburjs/ResourceCollection';

//
import Asteroid01 from '@assets/images/itch.io/asteroids/Asteroid01.png';
import Asteroid02 from '@assets/images/itch.io/asteroids/Asteroid02.png';
import Ship01 from '@assets/images/itch.io/asteroids/Ship01.png';
import Ship02 from '@assets/images/itch.io/asteroids/Ship02.png';
import Background01 from '@assets/images/itch.io/asteroids/Background01.png';
import Background02 from '@assets/images/itch.io/asteroids/Background02.png';
import Background03 from '@assets/images/itch.io/asteroids/Background03.png';
import Bullet01 from '@assets/images/itch.io/asteroids/Bullet01.png';
import Shoot01 from '@assets/audio/sfx/Shoot01.wav';
import Shoot02 from '@assets/audio/sfx/Shoot02.wav';
import Hit01 from '@assets/audio/sfx/Hit01.wav';
import Hit02 from '@assets/audio/sfx/Hit02.wav';
import Britanic from '@assets/fonts/Britanic.ttf';

//
const resourceCollection = new ResourceCollection();

//
// Flexible API: Pass string or import as arg #1
resourceCollection.add('Asteroid01', new ImageSource(Asteroid01));
resourceCollection.add(Asteroid02, new ImageSource(Asteroid02));
resourceCollection.add(Ship01, new ImageSource(Ship01));
resourceCollection.add(Ship02, new ImageSource(Ship02));
resourceCollection.add(Background01, new ImageSource(Background01));
resourceCollection.add(Background02, new ImageSource(Background02));
resourceCollection.add(Background03, new ImageSource(Background03));
resourceCollection.add(Bullet01, new ImageSource(Bullet01));
//
resourceCollection.add(Shoot01, new Sound(Shoot01));
resourceCollection.add(Shoot02, new Sound(Shoot02));
resourceCollection.add(Hit01, new Sound(Hit01));
resourceCollection.add(Hit02, new Sound(Hit02));
//
resourceCollection.add(
  Britanic,
  new FontSource(Britanic, 'Britanic', {
    filtering: ImageFiltering.Pixel,
    size: 18,
  }),
);

//
export const asteroidsResourceCollection = resourceCollection;
