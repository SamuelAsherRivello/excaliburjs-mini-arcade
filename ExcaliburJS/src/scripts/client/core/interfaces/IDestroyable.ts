/**
 * Interface for destroying
 */
export interface IDestroyable {
  // Properties -----------------------------------
  get isDestroying(): boolean;

  // Method ---------------------------------------
  destroyAsync(): Promise<any>;
  onDestroyComplete(): any;
}
