import { FontSource, ImageFiltering, ImageSource, Sound } from 'excalibur';

//
import Asteroid01 from '@assets/images/itch.io/asteroids/Asteroid01.png';
import Asteroid02 from '@assets/images/itch.io/asteroids/Asteroid02.png';
import Ship01 from '@assets/images/itch.io/asteroids/Ship01.png';
import Ship02 from '@assets/images/itch.io/asteroids/Ship02.png';
import Background01 from '@assets/images/itch.io/asteroids/Background01.png';
import Background02 from '@assets/images/itch.io/asteroids/Background02.png';
import Bullet01 from '@assets/images/itch.io/asteroids/Bullet01.png';
import Shoot01 from '@assets/audio/sfx/Shoot01.wav';
import Shoot02 from '@assets/audio/sfx/Shoot02.wav';
import Hit01 from '@assets/audio/sfx/Hit01.wav';
import Hit02 from '@assets/audio/sfx/Hit02.wav';
import FireHit02 from '@assets/audio/sfx/Fire_Hit_02.wav';

import { SharedResourceCollection } from '../../_shared/settings/SharedResourceCollection';

//
const rc = new SharedResourceCollection();

//
// Flexible API: Pass string or import as arg #1
rc.add('Asteroid01', new ImageSource(Asteroid01));
rc.add(Asteroid02, new ImageSource(Asteroid02));
rc.add(Ship01, new ImageSource(Ship01));
rc.add(Ship02, new ImageSource(Ship02));
rc.add(Background01, new ImageSource(Background01));
rc.add(Background02, new ImageSource(Background02));
rc.add(Bullet01, new ImageSource(Bullet01));
//
rc.add(Shoot01, new Sound(Shoot01));
rc.add(Shoot02, new Sound(Shoot02));
rc.add(Hit01, new Sound(Hit01));
rc.add(Hit02, new Sound(Hit02));
rc.add(FireHit02, new Sound(FireHit02));
//
export const asteroidsResourceCollection = rc;
