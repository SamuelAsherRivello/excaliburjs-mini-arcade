import { FontSource, ImageFiltering, ImageSource, Sound } from 'excalibur';

//CardBacks
import CardBack01 from '@assets/images/itch.io/twentyOne/cards/CardBack01.png';
import CardBack02 from '@assets/images/itch.io/twentyOne/cards/CardBack02.png';
import CardBack03 from '@assets/images/itch.io/twentyOne/cards/CardBack03.png';
import CardBack04 from '@assets/images/itch.io/twentyOne/cards/CardBack04.png';
import CardBack05 from '@assets/images/itch.io/twentyOne/cards/CardBack05.png';
import CardBack06 from '@assets/images/itch.io/twentyOne/cards/CardBack06.png';
import CardBack07 from '@assets/images/itch.io/twentyOne/cards/CardBack07.png';
import CardBack08 from '@assets/images/itch.io/twentyOne/cards/CardBack08.png';

//CardFronts
import CardFront_SuitClubs_Value01 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitClubs_Value01.png';
import CardFront_SuitClubs_Value02 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitClubs_Value02.png';
import CardFront_SuitClubs_Value03 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitClubs_Value03.png';
import CardFront_SuitClubs_Value04 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitClubs_Value04.png';
import CardFront_SuitClubs_Value05 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitClubs_Value05.png';
import CardFront_SuitClubs_Value06 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitClubs_Value06.png';
import CardFront_SuitClubs_Value07 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitClubs_Value07.png';
import CardFront_SuitClubs_Value08 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitClubs_Value08.png';
import CardFront_SuitClubs_Value09 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitClubs_Value09.png';
import CardFront_SuitClubs_Value10 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitClubs_Value10.png';
import CardFront_SuitClubs_Value11 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitClubs_Value11.png';
import CardFront_SuitClubs_Value12 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitClubs_Value12.png';
import CardFront_SuitClubs_Value13 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitClubs_Value13.png';
//
import CardFront_SuitDiamonds_Value01 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitDiamonds_Value01.png';
import CardFront_SuitDiamonds_Value02 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitDiamonds_Value02.png';
import CardFront_SuitDiamonds_Value03 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitDiamonds_Value03.png';
import CardFront_SuitDiamonds_Value04 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitDiamonds_Value04.png';
import CardFront_SuitDiamonds_Value05 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitDiamonds_Value05.png';
import CardFront_SuitDiamonds_Value06 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitDiamonds_Value06.png';
import CardFront_SuitDiamonds_Value07 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitDiamonds_Value07.png';
import CardFront_SuitDiamonds_Value08 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitDiamonds_Value08.png';
import CardFront_SuitDiamonds_Value09 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitDiamonds_Value09.png';
import CardFront_SuitDiamonds_Value10 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitDiamonds_Value10.png';
import CardFront_SuitDiamonds_Value11 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitDiamonds_Value11.png';
import CardFront_SuitDiamonds_Value12 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitDiamonds_Value12.png';
import CardFront_SuitDiamonds_Value13 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitDiamonds_Value13.png';
//
import CardFront_SuitSpades_Value01 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitSpades_Value01.png';
import CardFront_SuitSpades_Value02 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitSpades_Value02.png';
import CardFront_SuitSpades_Value03 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitSpades_Value03.png';
import CardFront_SuitSpades_Value04 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitSpades_Value04.png';
import CardFront_SuitSpades_Value05 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitSpades_Value05.png';
import CardFront_SuitSpades_Value06 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitSpades_Value06.png';
import CardFront_SuitSpades_Value07 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitSpades_Value07.png';
import CardFront_SuitSpades_Value08 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitSpades_Value08.png';
import CardFront_SuitSpades_Value09 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitSpades_Value09.png';
import CardFront_SuitSpades_Value10 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitSpades_Value10.png';
import CardFront_SuitSpades_Value11 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitSpades_Value11.png';
import CardFront_SuitSpades_Value12 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitSpades_Value12.png';
import CardFront_SuitSpades_Value13 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitSpades_Value13.png';
//
import CardFront_SuitHearts_Value01 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitHearts_Value01.png';
import CardFront_SuitHearts_Value02 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitHearts_Value02.png';
import CardFront_SuitHearts_Value03 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitHearts_Value03.png';
import CardFront_SuitHearts_Value04 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitHearts_Value04.png';
import CardFront_SuitHearts_Value05 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitHearts_Value05.png';
import CardFront_SuitHearts_Value06 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitHearts_Value06.png';
import CardFront_SuitHearts_Value07 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitHearts_Value07.png';
import CardFront_SuitHearts_Value08 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitHearts_Value08.png';
import CardFront_SuitHearts_Value09 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitHearts_Value09.png';
import CardFront_SuitHearts_Value10 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitHearts_Value10.png';
import CardFront_SuitHearts_Value11 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitHearts_Value11.png';
import CardFront_SuitHearts_Value12 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitHearts_Value12.png';
import CardFront_SuitHearts_Value13 from '@assets/images/itch.io/twentyOne/cards/CardFront_SuitHearts_Value13.png';
//

//Backgrounds

//
import Background01 from '@assets/images/itch.io/twentyOne/Background01.png';
import Hit01 from '@assets/audio/sfx/Hit01.wav';
import { SharedResourceCollection } from '../../_shared/settings/SharedResourceCollection';
import { Card, Suit } from '../models/Card';

//
// Flexible API: Pass string or import as arg #1
export class TwentyOneResourceCollection extends SharedResourceCollection {
  constructor() {
    super();
  }
  getCardFrontByCard(card: Card): ImageSource {
    //padd leading zero if one digit
    const value: string = card.value < 10 ? `0${card.value.toString()}` : card.value.toString();
    const name: string = `CardFront_Suit${Suit[card.suit]}_Value${value}`;
    if (!this.has(name)) {
      console.log(`ERROR:Check assets. ImageSource not found for ${name}`);
    }
    return this.get<ImageSource>(name);
  }
}
const rc = new TwentyOneResourceCollection();

rc.add(Background01, new ImageSource(Background01));
rc.add(CardBack01, new ImageSource(CardBack01));
rc.add(CardBack02, new ImageSource(CardBack02));
rc.add(CardBack03, new ImageSource(CardBack03));
rc.add(CardBack04, new ImageSource(CardBack04));
rc.add(CardBack05, new ImageSource(CardBack05));
rc.add(CardBack06, new ImageSource(CardBack06));
rc.add(CardBack07, new ImageSource(CardBack07));
rc.add(CardBack08, new ImageSource(CardBack08));
//
rc.add(CardFront_SuitClubs_Value01, new ImageSource(CardFront_SuitClubs_Value01));
rc.add(CardFront_SuitClubs_Value02, new ImageSource(CardFront_SuitClubs_Value02));
rc.add(CardFront_SuitClubs_Value03, new ImageSource(CardFront_SuitClubs_Value03));
rc.add(CardFront_SuitClubs_Value04, new ImageSource(CardFront_SuitClubs_Value04));
rc.add(CardFront_SuitClubs_Value05, new ImageSource(CardFront_SuitClubs_Value05));
rc.add(CardFront_SuitClubs_Value06, new ImageSource(CardFront_SuitClubs_Value06));
rc.add(CardFront_SuitClubs_Value07, new ImageSource(CardFront_SuitClubs_Value07));
rc.add(CardFront_SuitClubs_Value08, new ImageSource(CardFront_SuitClubs_Value08));
rc.add(CardFront_SuitClubs_Value09, new ImageSource(CardFront_SuitClubs_Value09));
rc.add(CardFront_SuitClubs_Value10, new ImageSource(CardFront_SuitClubs_Value10));
rc.add(CardFront_SuitClubs_Value11, new ImageSource(CardFront_SuitClubs_Value11));
rc.add(CardFront_SuitClubs_Value12, new ImageSource(CardFront_SuitClubs_Value12));
rc.add(CardFront_SuitClubs_Value13, new ImageSource(CardFront_SuitClubs_Value13));
//
rc.add(CardFront_SuitDiamonds_Value01, new ImageSource(CardFront_SuitDiamonds_Value01));
rc.add(CardFront_SuitDiamonds_Value02, new ImageSource(CardFront_SuitDiamonds_Value02));
rc.add(CardFront_SuitDiamonds_Value03, new ImageSource(CardFront_SuitDiamonds_Value03));
rc.add(CardFront_SuitDiamonds_Value04, new ImageSource(CardFront_SuitDiamonds_Value04));
rc.add(CardFront_SuitDiamonds_Value05, new ImageSource(CardFront_SuitDiamonds_Value05));
rc.add(CardFront_SuitDiamonds_Value06, new ImageSource(CardFront_SuitDiamonds_Value06));
rc.add(CardFront_SuitDiamonds_Value07, new ImageSource(CardFront_SuitDiamonds_Value07));
rc.add(CardFront_SuitDiamonds_Value08, new ImageSource(CardFront_SuitDiamonds_Value08));
rc.add(CardFront_SuitDiamonds_Value09, new ImageSource(CardFront_SuitDiamonds_Value09));
rc.add(CardFront_SuitDiamonds_Value10, new ImageSource(CardFront_SuitDiamonds_Value10));
rc.add(CardFront_SuitDiamonds_Value11, new ImageSource(CardFront_SuitDiamonds_Value11));
rc.add(CardFront_SuitDiamonds_Value12, new ImageSource(CardFront_SuitDiamonds_Value12));
rc.add(CardFront_SuitDiamonds_Value13, new ImageSource(CardFront_SuitDiamonds_Value13));
//
rc.add(CardFront_SuitSpades_Value01, new ImageSource(CardFront_SuitSpades_Value01));
rc.add(CardFront_SuitSpades_Value02, new ImageSource(CardFront_SuitSpades_Value02));
rc.add(CardFront_SuitSpades_Value03, new ImageSource(CardFront_SuitSpades_Value03));
rc.add(CardFront_SuitSpades_Value04, new ImageSource(CardFront_SuitSpades_Value04));
rc.add(CardFront_SuitSpades_Value05, new ImageSource(CardFront_SuitSpades_Value05));
rc.add(CardFront_SuitSpades_Value06, new ImageSource(CardFront_SuitSpades_Value06));
rc.add(CardFront_SuitSpades_Value07, new ImageSource(CardFront_SuitSpades_Value07));
rc.add(CardFront_SuitSpades_Value08, new ImageSource(CardFront_SuitSpades_Value08));
rc.add(CardFront_SuitSpades_Value09, new ImageSource(CardFront_SuitSpades_Value09));
rc.add(CardFront_SuitSpades_Value10, new ImageSource(CardFront_SuitSpades_Value10));
rc.add(CardFront_SuitSpades_Value11, new ImageSource(CardFront_SuitSpades_Value11));
rc.add(CardFront_SuitSpades_Value12, new ImageSource(CardFront_SuitSpades_Value12));
rc.add(CardFront_SuitSpades_Value13, new ImageSource(CardFront_SuitSpades_Value13));
//
rc.add(CardFront_SuitHearts_Value01, new ImageSource(CardFront_SuitHearts_Value01));
rc.add(CardFront_SuitHearts_Value02, new ImageSource(CardFront_SuitHearts_Value02));
rc.add(CardFront_SuitHearts_Value03, new ImageSource(CardFront_SuitHearts_Value03));
rc.add(CardFront_SuitHearts_Value04, new ImageSource(CardFront_SuitHearts_Value04));
rc.add(CardFront_SuitHearts_Value05, new ImageSource(CardFront_SuitHearts_Value05));
rc.add(CardFront_SuitHearts_Value06, new ImageSource(CardFront_SuitHearts_Value06));
rc.add(CardFront_SuitHearts_Value07, new ImageSource(CardFront_SuitHearts_Value07));
rc.add(CardFront_SuitHearts_Value08, new ImageSource(CardFront_SuitHearts_Value08));
rc.add(CardFront_SuitHearts_Value09, new ImageSource(CardFront_SuitHearts_Value09));
rc.add(CardFront_SuitHearts_Value10, new ImageSource(CardFront_SuitHearts_Value10));
rc.add(CardFront_SuitHearts_Value11, new ImageSource(CardFront_SuitHearts_Value11));
rc.add(CardFront_SuitHearts_Value12, new ImageSource(CardFront_SuitHearts_Value12));
rc.add(CardFront_SuitHearts_Value13, new ImageSource(CardFront_SuitHearts_Value13));

//
rc.add(Hit01, new Sound(Hit01));
//
export const twentyOneResourceCollection = rc;
