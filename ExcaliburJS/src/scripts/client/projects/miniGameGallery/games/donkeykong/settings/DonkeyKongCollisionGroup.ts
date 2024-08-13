import * as ex from 'excalibur';

// Create collision groups
const playerGroup = ex.CollisionGroupManager.create('DonkeyKongPlayer');
const platformGroup = ex.CollisionGroupManager.create('DonkeyKongPlatform');
const barrelGroup = ex.CollisionGroupManager.create('DonkeyKongBarrel');

// Define collision rules
const playerCanCollideWith = ex.CollisionGroup.collidesWith([
  platformGroup, // player collides with platforms
  barrelGroup, // player collides with barrels
]);

const barrelCanCollideWith = ex.CollisionGroup.collidesWith([
  platformGroup, // barrels collide with platforms
]);

export const DonkeyKongCollisionGroup = {
  Player: playerCanCollideWith,
  Barrel: barrelCanCollideWith,
  PlayerGroup: playerGroup,
  PlatformGroup: platformGroup,
  BarrelGroup: barrelGroup,
};
