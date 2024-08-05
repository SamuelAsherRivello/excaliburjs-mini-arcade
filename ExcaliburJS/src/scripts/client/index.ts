import { EngineSingleton } from './core/engines/excaliburjs/singletons/EngineSingleton';
import { MiniArcadeGame } from './projects/miniArcade/base/MiniArcadeGame';
//
import { AsteroidsGame } from './projects/miniArcade/games/asteroids/AsteroidsGame';
import { BreakoutGame } from './projects/miniArcade/games/breakout/BreakoutGame';
import { FroggerGame } from './projects/miniArcade/games/frogger/FroggerGame';
import { StarterGame } from './projects/miniArcade/games/templateGame/StarterGame';

/////////////////////////
let game: MiniArcadeGame;

/////////////////////////
//game = new AsteroidsGame();
game = new BreakoutGame();
//game = new FroggerGame();
//game = new StarterGame();

/////////////////////////
//TODO: Rethink this (Needed by LayoutEngine.ts)
EngineSingleton.instance = game;

/////////////////////////
game.initializeAsync();
