import { BaseController } from '../../../core/engines/excaliburjs/controller/BaseController';
import { ActionState, MiniArcadeInput } from '../settings/MiniArcadeInput';

export class MiniArcadeController extends BaseController {
  private input: MiniArcadeInput;

  constructor() {
    super();
    this.input = new MiniArcadeInput();
  }

  update(engine: ex.Engine, delta: number): void {
    this.input.update(engine, delta);
  }

  get left(): ActionState {
    return this.input.actions.left;
  }

  get right(): ActionState {
    return this.input.actions.right;
  }

  get up(): ActionState {
    return this.input.actions.up;
  }

  get down(): ActionState {
    return this.input.actions.down;
  }

  get action(): ActionState {
    return this.input.actions.action;
  }

  get fullScreen(): ActionState {
    return this.input.actions.fullScreen;
  }

  get resetGame(): ActionState {
    return this.input.actions.resetGame;
  }
}
