import { FontSource, ImageFiltering, ImageSource, Sound } from 'excalibur';

//
import Hero01 from '@assets/images/itch.io/donkeykong/Hero01.png';
import Platform01 from '@assets/images/itch.io/donkeykong/Platform01.png';
import Background01 from '@assets/images/itch.io/donkeykong/Background01.png';
import Hit01 from '@assets/audio/sfx/Hit01.wav';
import { SharedResourceCollection } from '../../_shared/settings/SharedResourceCollection';

//
// Flexible API: Pass string or import as arg #1
const rc = new SharedResourceCollection();
rc.add(Hero01, new ImageSource(Hero01));
rc.add(Platform01, new ImageSource(Platform01));
rc.add(Background01, new ImageSource(Background01));
//
rc.add(Hit01, new Sound(Hit01));
//
export const donkeyKongResourceCollection = rc;
