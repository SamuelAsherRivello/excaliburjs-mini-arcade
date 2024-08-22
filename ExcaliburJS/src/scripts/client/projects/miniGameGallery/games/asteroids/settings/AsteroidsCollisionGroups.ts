// In a new file, e.g., AsteroidsCollisionGroups.ts
import * as ex from 'excalibur';

// Create collision groups
const playerGroup = ex.CollisionGroupManager.create('player');
const bulletGroup = ex.CollisionGroupManager.create('bullet');
const asteroidGroup = ex.CollisionGroupManager.create('asteroid');

// Define collision rules
const playerCanCollideWith = ex.CollisionGroup.collidesWith([
  asteroidGroup, // player collides with asteroids
]);

const bulletCanCollideWith = ex.CollisionGroup.collidesWith([
  asteroidGroup, // bullets collide with asteroids
]);

const asteroidCanCollideWith = ex.CollisionGroup.collidesWith([
  //TEMP: playerGroup, // asteroids collide with player
  bulletGroup, // asteroids collide with bullets
]);

export const AsteroidsCollisionGroups = {
  Player: playerCanCollideWith,
  Bullet: bulletCanCollideWith,
  Asteroid: asteroidCanCollideWith,
  PlayerGroup: playerGroup,
  BulletGroup: bulletGroup,
  AsteroidGroup: asteroidGroup,
};
