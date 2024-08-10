import { FontSource, ImageFiltering, ImageSource, Sound } from 'excalibur';
import { ResourceCollection } from '@client/core/engines/excaliburjs/resources/ResourceCollection';
//
import BackgroundGeneric01 from '@assets/images/itch.io/_shared/BackgroundGeneric01.png';
import Britanic from '@assets/fonts/Britanic.ttf';
import { Card } from '../../twentyOne/models/Card';
//
// This is an exceptional case. We want each minigame to extend this class
// So each minigame has its own resource collection based on this class
// to have a few shared high level resources - across all games
export class SharedResourceCollection extends ResourceCollection {
  constructor() {
    super();
    this.add(BackgroundGeneric01, new ImageSource(BackgroundGeneric01));
    this.add(
      Britanic,
      new FontSource(Britanic, 'Britanic', {
        filtering: ImageFiltering.Pixel,
        size: 18,
      }),
    );
  }
}
//
export const sharedResourceCollection = new SharedResourceCollection();
