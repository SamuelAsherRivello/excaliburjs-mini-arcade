import { EngineSingleton } from '@client/core/engines/excaliburjs/singletons/EngineSingleton';
import * as ex from 'excalibur';

export interface ActionState {
  wasPressed: boolean;
  isHeld: boolean;
  wasReleased: boolean;
}

export class MiniGameInput {
  private _lastPointerDownTime: number = 0;
  private _isPointerDown: boolean = false;
  private _isPointerDoubleClick: boolean = false;
  actions: {
    left: ActionState;
    right: ActionState;
    up: ActionState;
    down: ActionState;
    action: ActionState;
    fullScreen: ActionState;
    resetGame: ActionState;
  };

  constructor() {
    this.actions = {
      left: { wasPressed: false, isHeld: false, wasReleased: false },
      down: { wasPressed: false, isHeld: false, wasReleased: false },
      right: { wasPressed: false, isHeld: false, wasReleased: false },
      up: { wasPressed: false, isHeld: false, wasReleased: false },
      action: { wasPressed: false, isHeld: false, wasReleased: false },
      fullScreen: { wasPressed: false, isHeld: false, wasReleased: false },
      resetGame: { wasPressed: false, isHeld: false, wasReleased: false },
    };

    // Add pointer down event listener
    EngineSingleton.instance.input.pointers.primary.on('down', () => {
      const currentTime = Date.now();
      if (currentTime - this._lastPointerDownTime < 150) {
        this._isPointerDoubleClick = true;
      }
      this._lastPointerDownTime = currentTime;
      this._isPointerDown = true;
    });

    EngineSingleton.instance.input.pointers.primary.on('up', () => {
      this._isPointerDown = false;
    });
  }

  update(engine: ex.Engine, delta: number): void {
    this.updateAction(engine, 'left', [ex.Keys.A, ex.Keys.Left]);
    this.updateAction(engine, 'right', [ex.Keys.D, ex.Keys.Right]);
    this.updateAction(engine, 'up', [ex.Keys.W, ex.Keys.Up]);
    this.updateAction(engine, 'down', [ex.Keys.S, ex.Keys.Down]);
    this.updateAction(engine, 'action', [ex.Keys.Space, ex.Keys.Enter]);
    this.updateAction(engine, 'fullScreen', [ex.Keys.F]);
    this.updateAction(engine, 'resetGame', [ex.Keys.R]);

    //TODO: this is not scalable. Fold full pointer support in.
    this.actions.action.isHeld = this.actions.action.wasPressed || this._isPointerDown;
    this.actions.action.wasPressed = this.actions.action.wasPressed || this._isPointerDown;
    this.actions.fullScreen.wasPressed = this.actions.fullScreen.wasPressed;
    this._isPointerDoubleClick = false;
    this._isPointerDown = false;
  }

  private updateAction(engine: ex.Engine, action: keyof typeof this.actions, keys: ex.Keys[]): void {
    const keyboard = engine.input.keyboard;
    this.actions[action] = {
      wasPressed: keys.some((key) => keyboard.wasPressed(key)),
      isHeld: keys.some((key) => keyboard.isHeld(key)),
      wasReleased: keys.some((key) => keyboard.wasReleased(key)),
    };
  }
}
