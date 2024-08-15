import * as ex from 'excalibur';
import { EngineSingleton } from '../../../core/engines/excaliburjs/singletons/EngineSingleton';
import { StarterPlayer } from '../games/templateGame/actors/StarterPlayer';

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

  static clearActions(target: ex.Actor) {
    target.actions.clearActions();
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
    return await MiniGameAnimations.awaitTimeAsync(999 / EngineSingleton.instance.currentFrameElapsedMs);
  }

  public static async awaitTimeAsync(durationMs: number) {
    //TODO: I don't think this works or works well.
    return new Promise((resolve) => setTimeout(resolve, durationMs));
  }

  public static async moveToAsync(target: ex.Actor, toPosition: ex.Vector, animationConfiguration?: AnimationConfiguration) {
    //Spread
    animationConfiguration = { ...AnimationConfigurationDefault, ...animationConfiguration };

    // Delay
    await MiniGameAnimations.awaitTimeAsync(animationConfiguration.delay!);

    // Delta
    const actionSequence1 = new ex.ActionSequence(target, (ctx) => {
      ctx.easeTo(toPosition, animationConfiguration.duration!);
    });

    const actionSequence2 = new ex.ActionSequence(target, (ctx) => {
      ctx.scaleTo(ex.vec(1.1, 1.1), ex.vec(2, 2));
      ctx.scaleTo(ex.vec(1, 1), ex.vec(2, 2));
    });

    const parallel = new ex.ParallelActions([actionSequence1, actionSequence2]);
    target.actions.runAction(parallel);

    //TODO: Works great! But better wait to await a parallel?
    while (!actionSequence1.isComplete() || !actionSequence2.isComplete()) {
      await MiniGameAnimations.awaitNextFrameAsync();
    }
    return Promise.resolve();
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
