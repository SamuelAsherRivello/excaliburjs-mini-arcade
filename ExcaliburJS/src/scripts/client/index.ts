import { AsteroidsGame } from './projects/miniGameGallery/games/asteroids/AsteroidsGame';
import { BreakoutGame } from './projects/miniGameGallery/games/breakout/BreakoutGame';
import { FroggerGame } from './projects/miniGameGallery/games/frogger/FroggerGame';
import { StarterGame } from './projects/miniGameGallery/games/templateGame/StarterGame';
import { TwentyOneGame } from './projects/miniGameGallery/games/twentyOne/TwentyOneGame';
import { MiniGameGallery } from './projects/miniGameGallery/MiniGameGallery';

/////////////////////////
const miniGameGallery: MiniGameGallery = new MiniGameGallery();

/////////////////////////
miniGameGallery.addGame(AsteroidsGame);
miniGameGallery.addGame(BreakoutGame);
miniGameGallery.addGame(FroggerGame);
miniGameGallery.addGame(StarterGame);
miniGameGallery.addGame(TwentyOneGame);

/////////////////////////
(async () => {
  /////////////////////////
  await miniGameGallery.initializeAsync();

  /////////////////////////
  let gameIndex = Math.round(Math.random() * (miniGameGallery.gameCount - 1));
  gameIndex = miniGameGallery.gameCount - 1;

  //
  await miniGameGallery.showGameAtIndexAsync(gameIndex);

  //
  miniGameGallery.gameCurrent.toggleDebug();
})();
