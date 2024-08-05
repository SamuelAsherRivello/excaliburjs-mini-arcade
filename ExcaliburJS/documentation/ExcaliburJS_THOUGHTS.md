---

## Scenes

### API

https://excaliburjs.com/docs/scenes/#initialization

I don't like that

game.add(player);

is the same as

game.currentScene.add(player);

if the latter is available by default in the engine (it is) then remove the former

## Game

The game object's API is too comprehensive.

There is too much in game.blah related to scenes

Game from...

game.sceneBlah

to ...

game.sceneSystem.sceneBlah
