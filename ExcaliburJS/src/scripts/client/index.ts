import { AsteroidsGame } from './projects/miniGameGallery/games/asteroids/AsteroidsGame';
import { BreakoutGame } from './projects/miniGameGallery/games/breakout/BreakoutGame';
import { FroggerGame } from './projects/miniGameGallery/games/frogger/FroggerGame';
import { StarterGame } from './projects/miniGameGallery/games/templateGame/StarterGame';
import { MiniGameGallery } from './projects/miniGameGallery/MiniGameGallery';

/////////////////////////
const miniGameGallery: MiniGameGallery = new MiniGameGallery();

/////////////////////////
miniGameGallery.addGame(AsteroidsGame);
miniGameGallery.addGame(BreakoutGame);
miniGameGallery.addGame(FroggerGame);
miniGameGallery.addGame(StarterGame);

/////////////////////////
(async () => {
  /////////////////////////
  await miniGameGallery.initializeAsync();

  /////////////////////////
  await miniGameGallery.showGameAtIndexAsync(0);
})();
