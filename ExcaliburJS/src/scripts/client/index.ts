import * as ex from 'excalibur';
import { AsteroidsGame } from './projects/miniGameGallery/games/asteroids/AsteroidsGame';
import { BreakoutGame } from './projects/miniGameGallery/games/breakout/BreakoutGame';
import { FroggerGame } from './projects/miniGameGallery/games/frogger/FroggerGame';
import { StarterGame } from './projects/miniGameGallery/games/templateGame/StarterGame';
import { TwentyOneGame } from './projects/miniGameGallery/games/twentyOne/TwentyOneGame';
import { MiniGameGallery } from './projects/miniGameGallery/MiniGameGallery';
import { DonkeyKongGame } from './projects/miniGameGallery/games/donkeykong/DonkeyKongGame';

/////////////////////////
const miniGameGallery: MiniGameGallery = new MiniGameGallery();

/////////////////////////
miniGameGallery.addGame(StarterGame);
miniGameGallery.addGame(AsteroidsGame);
miniGameGallery.addGame(BreakoutGame);
miniGameGallery.addGame(FroggerGame);
miniGameGallery.addGame(TwentyOneGame);
miniGameGallery.addGame(DonkeyKongGame);

/////////////////////////
(async () => {
  /////////////////////////
  await miniGameGallery.initializeAsync();

  /////////////////////////
  let gameIndex = Math.round(Math.random() * (miniGameGallery.gameCount - 1));
  gameIndex = 0;
  gameIndex = miniGameGallery.gameCount - 1;

  //
  await miniGameGallery.showGameAtIndexAsync(gameIndex);

  /////////////////////////
  const debugConfig: ex.DebugConfig = new ex.DebugConfig(miniGameGallery.gameCurrent);
  // debugConfig.graphics = {
  //   showAll: true,
  //   showBounds: true,
  //   boundsColor: ex.Color.Red,
  // };
  debugConfig.collider = {
    showAll: true,
    showBounds: true,
    boundsColor: new ex.Color(0, 255, 0, 0.5),
    showOwner: true,
    showGeometry: true,
    geometryColor: new ex.Color(255, 0, 255, 0.5),
    geometryLineWidth: 1,
    geometryPointSize: 1,
  };

  miniGameGallery.gameCurrent.debug = debugConfig;

  //DEBUG
  //miniGameGallery.gameCurrent.toggleDebug();
})();
