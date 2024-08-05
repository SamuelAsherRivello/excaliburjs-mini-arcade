import { ObservableValue } from '../observables/ObservableValue';

/**
 * Interface for destroying
 */
export interface IHealth {
  // Properties -----------------------------------
  get health(): ObservableValue<number>;

  // Method ---------------------------------------
}
