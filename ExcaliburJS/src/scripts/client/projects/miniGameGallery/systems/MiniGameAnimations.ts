import * as ex from 'excalibur';
import { AsteroidsPlayer } from '../games/asteroids/actors/AsteroidsPlayer';

export enum CameraShake {
  Light,
  Medium,
  Heavy,
}

export interface AnimationConfiguration {
  duration?: number;
  delay?: number;
}

const AnimationConfigurationDefault: AnimationConfiguration = {
  duration: 1000,
  delay: 0,
};

export class MiniGameAnimations {
  public static callAfterDelay(target: ex.Actor, delay: number, method: () => void) {
    target.actions.delay(delay).callMethod(method);
  }

  public static callAfterFrame(target: ex.Actor, method: () => void) {
    target.actions.delay(100).callMethod(method);
  }
  /**
   *
   * @param target
   */
  static async particlesAddDustAsync(target: ex.Actor, duration: number) {
    target.actions
      .callMethod(async () => {
        const particleEmitter = new ex.ParticleEmitter({});
        particleEmitter.emitterType = ex.EmitterType.Circle; // Shape of emitter nozzle
        particleEmitter.radius = 5;
        particleEmitter.minVel = 100;
        particleEmitter.maxVel = 200;
        particleEmitter.minAngle = 0;
        particleEmitter.maxAngle = Math.PI * 2;
        particleEmitter.emitRate = 300; // 300 particles/second
        particleEmitter.opacity = 0.5;
        particleEmitter.fadeFlag = true; // fade particles overtime
        particleEmitter.particleLife = 100; // in milliseconds = 1 sec
        particleEmitter.maxSize = 10; // in pixels
        particleEmitter.minSize = 1;
        particleEmitter.color = ex.Color.Rose;
        particleEmitter.isEmitting = true; // should the emitter be emitting
        particleEmitter.pos = new ex.Vector(0, 40);
        particleEmitter.particleLife;
        target.addChild(particleEmitter);

        await MiniGameAnimations.awaitTimeAsync(duration);
        particleEmitter.kill();
      })
      .delay(1000);

    return Promise.resolve();
  }

  /**
   *
   */
  public static async cameraShakeAsync(engine: ex.Engine, cameraShake: CameraShake) {
    switch (cameraShake) {
      case CameraShake.Light:
        engine.currentScene.camera.shake(0.5, 0.5, 50);
        if (engine.currentScene.camera.zoom !== 1) {
          //engine.currentScene.camera.zoomOverTime(1, 100, ex.EasingFunctions.EaseInOutQuad);
        } else {
          //engine.currentScene.camera.zoomOverTime(1.5, 100, ex.EasingFunctions.EaseInOutQuad);
        }

        break;
      case CameraShake.Medium:
        engine.currentScene.camera.shake(5, 5, 50);
        break;
      case CameraShake.Heavy:
        engine.currentScene.camera.shake(15, 15, 50);
        break;
    }
  }
  public static async awaitNextFrameAsync() {
    return MiniGameAnimations.awaitTimeAsync(1000 / 30); // assume 30fps or higher
  }

  public static async awaitTimeAsync(durationMs: number) {
    //TODO: I don't think this works or works well.
    return new Promise((resolve) => setTimeout(resolve, durationMs));
  }

  public static async scaleUpAndFadeUpAsync(target: ex.Actor, animationConfiguration?: AnimationConfiguration) {
    //Spread
    animationConfiguration = { ...AnimationConfigurationDefault, ...animationConfiguration };

    // Initial
    target.scale = ex.vec(0, 0);
    target.graphics.opacity = 0;

    // Delay
    await MiniGameAnimations.awaitTimeAsync(animationConfiguration.delay!);

    // Delta
    const actionSequence1 = new ex.ActionSequence(target, (ctx) => {
      ctx.scaleTo(ex.vec(1, 1), ex.vec(3, 3));
    });

    const actionSequence2 = new ex.ActionSequence(target, (ctx) => {
      ctx.fade(1, animationConfiguration.duration!);
    });

    const parallel = new ex.ParallelActions([actionSequence1, actionSequence2]);
    target.actions.runAction(parallel);

    //TODO: Works great! But better wait to await a parallel?
    while (!actionSequence1.isComplete() || !actionSequence2.isComplete()) {
      await MiniGameAnimations.awaitNextFrameAsync();
    }
    return Promise.resolve();
  }

  public static async scaleDownAndFadeDownAsync(target: ex.Actor, animationConfiguration?: AnimationConfiguration) {
    //Spread
    animationConfiguration = { ...AnimationConfigurationDefault, ...animationConfiguration };

    // Initial
    //target.scale = ex.vec(1, 1);
    //target.graphics.opacity = 1;

    // Delay
    await MiniGameAnimations.awaitTimeAsync(animationConfiguration.delay!);

    //change
    const actionSequence1 = new ex.ActionSequence(target, (ctx) => {
      ctx.scaleTo(ex.vec(0, 0), ex.vec(2, 2));
    });

    const actionSequence2 = new ex.ActionSequence(target, (ctx) => {
      ctx.fade(0, animationConfiguration.duration!);
    });

    const parallel = new ex.ParallelActions([actionSequence1, actionSequence2]);
    const actionContext: ex.ActionContext = target.actions.runAction(parallel);

    //TODO: Works great! But better wait to await a parallel?
    while (!actionSequence1.isComplete() || !actionSequence2.isComplete()) {
      await MiniGameAnimations.awaitNextFrameAsync();
    }
    return Promise.resolve();
  }

  public static async scaleUpAndDownAsync(target: ex.Actor) {
    // Delta
    const actionSequence1 = new ex.ActionSequence(target, (ctx) => {
      ctx.scaleTo(ex.vec(1.2, 1.2), ex.vec(2, 2));
      ctx.scaleTo(ex.vec(1, 1), ex.vec(2, 2));
    });

    const parallel = new ex.ParallelActions([actionSequence1]);
    await target.actions.runAction(parallel);

    //TODO: Works great! But better wait to await a parallel?
    while (!actionSequence1.isComplete()) {
      await MiniGameAnimations.awaitNextFrameAsync();
    }
    return Promise.resolve();
  }

  public static async scaleDownAndUpAsync(target: ex.Actor) {
    // Delta
    const actionSequence1 = new ex.ActionSequence(target, (ctx) => {
      ctx.scaleTo(ex.vec(0.7, 0.7), ex.vec(4, 4));
      ctx.scaleTo(ex.vec(1, 1), ex.vec(4, 4));
    });

    const parallel = new ex.ParallelActions([actionSequence1]);
    await target.actions.runAction(parallel);

    //TODO: Works great! But better wait to await a parallel?
    while (!actionSequence1.isComplete()) {
      await MiniGameAnimations.awaitNextFrameAsync();
    }
    return Promise.resolve();
  }
}
