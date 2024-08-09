import { FontSource, ImageFiltering, ImageSource, Sound } from 'excalibur';

//
import KnightStatic01 from '@assets/images/itch.io/knight/KnightStatic01.png';
import Background01 from '@assets/images/itch.io/starter/Background01.png';
import Hit01 from '@assets/audio/sfx/Hit01.wav';
import Britanic from '@assets/fonts/Britanic.ttf';
import { ResourceCollection } from '@client/core/engines/excaliburjs/resources/ResourceCollection';

//
// Flexible API: Pass string or import as arg #1
const rc = new ResourceCollection();
rc.add(KnightStatic01, new ImageSource(KnightStatic01));
rc.add(Background01, new ImageSource(Background01));
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
export const starterResourceCollection = rc;
