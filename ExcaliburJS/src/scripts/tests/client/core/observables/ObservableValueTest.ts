import { ObservableValue } from '@client/core/observables/ObservableValue';
import { afterAll, afterEach, beforeAll, beforeEach, expect, test, vi } from 'vitest';

class SampleObservableValue<TValue> extends ObservableValue<TValue> {}

class CustomObservableValue<TValue> extends ObservableValue<TValue> {
  protected override onValueChanging(previousValue: TValue, newValue: TValue): TValue {
    if (newValue === 20) {
      return previousValue; // Reject the change if the new value is 20
    }
    return (Number(newValue) + 1) as unknown as TValue; // Add 1 to the new value
  }
}

beforeAll(() => {
  //console.log('ObservableValueTest.beforeAll()');
});

beforeEach(() => {
  //console.log('ObservableValueTest.beforeEach()');
});

afterEach(() => {
  //console.log('ObservableValueTest.afterEach()');
});

afterAll(() => {
  //console.log('ObservableValueTest.afterAll()');
});

test('instance is not null when default', () => {
  // Arrange
  const initialValue = 10;
  const observable = new SampleObservableValue<number>(initialValue);

  // Act
  const value = observable.value;

  // Assert
  expect(observable).not.toBeNull();
  expect(value).toBe(initialValue);
});

test('value change triggers OnValueChanged event', () => {
  // Arrange
  const initialValue = 10;
  const newValue = 20;
  const observable = new SampleObservableValue<number>(initialValue);
  const mockCallback = vi.fn();
  observable.onValueChanged.addEventListener(mockCallback);

  // Act
  observable.value = newValue;

  // Assert
  expect(mockCallback).toHaveBeenCalledWith(initialValue, newValue);
  expect(observable.value).toBe(newValue);
});

test('OnValueChangedRefresh triggers event with current value', () => {
  // Arrange
  const initialValue = 10;
  const observable = new SampleObservableValue<number>(initialValue);
  const mockCallback = vi.fn();
  observable.onValueChanged.addEventListener(mockCallback);

  // Act
  observable.refreshValueChanged();

  // Assert
  expect(mockCallback).toHaveBeenCalledWith(initialValue, initialValue);
});

test('OnValueChanging method is called when value changes', () => {
  // Arrange
  const initialValue = 10;
  const newValue = 15;
  const observable = new CustomObservableValue<number>(initialValue);

  // Act
  observable.value = newValue;

  // Assert
  expect(observable.value).toBe(newValue + 1);
});

test('OnValueChanging method can reject value changes', () => {
  // Arrange
  const initialValue = 10;
  const rejectedValue = 20;
  const observable = new CustomObservableValue<number>(initialValue);

  // Act
  observable.value = rejectedValue;

  // Assert
  expect(observable.value).toBe(initialValue);
});
