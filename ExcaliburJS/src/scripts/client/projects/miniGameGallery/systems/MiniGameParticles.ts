import * as ex from 'excalibur';
import { MiniGameAnimations } from './MiniGameAnimations';
import { EngineSingleton } from '@client/core/engines/excaliburjs/singletons/EngineSingleton';

export interface ParticleConfiguration {
  duration?: number;
  delay?: number;
  directionRadians?: number;
}

const ParticleConfigurationDefault: ParticleConfiguration = {
  duration: 1000,
  delay: 0,
  directionRadians: 0,
};

export class MiniGameParticles {
  public static async particlesAddDustAsync(target: ex.Actor, particleConfiguration?: ParticleConfiguration) {
    //Spread
    particleConfiguration = { ...ParticleConfigurationDefault, ...particleConfiguration };

    //
    const particleEmitter = new ex.ParticleEmitter({});
    particleEmitter.pos = target.pos;
    particleEmitter.radius = 5;
    particleEmitter.emitRate = 300; // Particles/second
    particleEmitter.particleLife = 100; //
    particleEmitter.color = ex.Color.White;
    particleEmitter.opacity = 0.2;
    //
    particleEmitter.emitterType = ex.EmitterType.Circle; // Shape of emitter nozzle
    particleEmitter.minSize = 5; // Pixels
    particleEmitter.maxSize = 20; // Pixels
    particleEmitter.minVel = 50;
    particleEmitter.maxVel = 100;
    particleEmitter.minAngle = 0; // Radians
    particleEmitter.maxAngle = Math.PI; // Radians
    particleEmitter.fadeFlag = true;
    particleEmitter.isEmitting = true;

    //Add as sibling of target
    MiniGameParticles.getParticleParent().add(particleEmitter);

    await MiniGameAnimations.awaitTimeAsync(particleConfiguration.duration!);
    particleEmitter.kill();

    return Promise.resolve();
  }
  public static getParticleParent(): ex.Engine {
    return EngineSingleton.instance;
  }
}
