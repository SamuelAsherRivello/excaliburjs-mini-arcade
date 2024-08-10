import { FontSource, ImageFiltering, ImageSource, Sound } from 'excalibur';

//
import KnightStatic01 from '@assets/images/itch.io/knight/KnightStatic01.png';
import Background01 from '@assets/images/itch.io/starter/Background01.png';
import Hit01 from '@assets/audio/sfx/Hit01.wav';
import { SharedResourceCollection } from '../../_shared/settings/SharedResourceCollection';

//
// Flexible API: Pass string or import as arg #1
const rc = new SharedResourceCollection();
rc.add(KnightStatic01, new ImageSource(KnightStatic01));
rc.add(Background01, new ImageSource(Background01));
//
rc.add(Hit01, new Sound(Hit01));
//
export const starterResourceCollection = rc;
