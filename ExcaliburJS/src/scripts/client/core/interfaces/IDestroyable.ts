/**
 * Interface for destroying
 */
export interface IDestroyable {
  // Properties -----------------------------------
  get isDestroying(): boolean;

  // Method ---------------------------------------
  destroy(): any;
  onDestroyComplete(): any;
}
