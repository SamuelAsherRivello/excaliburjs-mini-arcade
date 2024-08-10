import { FontSource, ImageFiltering, ImageSource, Sound } from 'excalibur';

//
import FrogIdle01 from '@assets/images/itch.io/frogger/FrogIdle01.png';
import FrogJump01 from '@assets/images/itch.io/frogger/FrogJump01.png';
import Log01 from '@assets/images/itch.io/frogger/Log01.png';
import Log02 from '@assets/images/itch.io/frogger/Log02.png';
import Car01 from '@assets/images/itch.io/frogger/Car01.png';
import Car02 from '@assets/images/itch.io/frogger/Car02.png';
import Hit01 from '@assets/audio/sfx/Hit01.wav';
import Background01 from '@assets/images/itch.io/frogger/Background01.png';
import Britanic from '@assets/fonts/Britanic.ttf';
import { SharedResourceCollection } from '../../_shared/settings/SharedResourceCollection';

//
// Flexible API: Pass string or import as arg #1
const rc = new SharedResourceCollection();
rc.add(FrogIdle01, new ImageSource(FrogIdle01));
rc.add(FrogJump01, new ImageSource(FrogJump01));
rc.add(Car01, new ImageSource(Car01));
rc.add(Car02, new ImageSource(Car02));
rc.add(Log01, new ImageSource(Log01));
rc.add(Log02, new ImageSource(Log02));
rc.add(Background01, new ImageSource(Background01));
//
rc.add(Hit01, new Sound(Hit01));
//
export const froggerResourceCollection = rc;
