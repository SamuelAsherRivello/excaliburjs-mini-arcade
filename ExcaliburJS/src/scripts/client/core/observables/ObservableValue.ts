/**
 * ObservableValue class with event emission capabilities.
 */
export class ObservableValue<TValue> {
  // Events ---------------------------------------
  public readonly onValueChanged: IEvent<TValue, TValue>;

  // Properties -----------------------------------
  get value(): TValue {
    return this._currentValue;
  }
  set value(newValue: TValue) {
    //Validate
    this._currentValue = this.onValueChanging(this._currentValue, newValue);

    //Dispatch only if truly changed
    if (this._previousValue != this._currentValue) {
      //Store last
      this._previousValue = this._currentValue;
      //Dispatch
      this.onValueChanged.invoke(this._previousValue, this._currentValue);
    }
  }

  // Fields ---------------------------------------
  private _currentValue: TValue;
  private _previousValue: TValue;

  // Initialization -------------------------------
  constructor(initialValue: TValue) {
    this.onValueChanged = new RmcEvent<TValue, TValue>();
    if (initialValue !== undefined) {
      this._currentValue = initialValue;
      this._previousValue = initialValue;
    } else {
      throw new Error('Initial value must be provided');
    }
  }

  // Methods --------------------------------------
  protected onValueChanging(previousValue: TValue, newValue: TValue): TValue {
    return newValue;
  }

  public refreshValueChanged(): void {
    (this.onValueChanged as RmcEvent<TValue | undefined, TValue>).refresh(this._previousValue, this._currentValue);
  }
}

// Helper Classes and Interfaces ------------------

class EventEmitter {
  private listeners: { [event: string]: Function[] } = {};

  on(event: string, listener: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  off(event: string, listener: Function): void {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((l) => l !== listener);
    }
  }

  emit(event: string, ...args: any[]): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => listener(...args));
    }
  }
}

export interface IEvent<TPrevious, TCurrent> {
  addEventListener(listener: (previousValue: TPrevious, currentValue: TCurrent) => void): void;
  removeEventListener(listener: (previousValue: TPrevious, currentValue: TCurrent) => void): void;
  invoke(previousValue: TPrevious, currentValue: TCurrent): void;
}

class RmcEvent<TPrevious, TCurrent> implements IEvent<TPrevious, TCurrent> {
  private eventEmitter = new EventEmitter();
  private eventName = 'valueChanged';

  addEventListener(listener: (previousValue: TPrevious, currentValue: TCurrent) => void): void {
    this.eventEmitter.on(this.eventName, listener);
  }

  removeEventListener(listener: (previousValue: TPrevious, currentValue: TCurrent) => void): void {
    this.eventEmitter.off(this.eventName, listener);
  }

  invoke(previousValue: TPrevious, currentValue: TCurrent): void {
    this.eventEmitter.emit(this.eventName, previousValue, currentValue);
  }

  refresh(previousValue: TPrevious, currentValue: TCurrent): void {
    this.invoke(previousValue, currentValue);
  }
}
