import { ObservableValue } from '@client/core/observables/ObservableValue';
import { afterAll, afterEach, beforeAll, beforeEach, expect, test, vi } from 'vitest';

class SampleObservableValue<TValue> extends ObservableValue<TValue> {}

class TestObservableValue<TValue> extends SampleObservableValue<TValue> {
  public setOnValueChanging(callback: (prev: TValue, next: TValue) => TValue) {
    this.onValueChanging = callback;
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

test('OnValueChanging method can reject value changes', () => {
  // Arrange
  const initialValue = 10;
  const rejectedValue = 20;
  const observable = new TestObservableValue<number>(initialValue);
  const mockCallback = vi.fn();
  observable.onValueChanged.addEventListener(mockCallback);

  // Override onValueChanging to reject changes
  observable.setOnValueChanging((prev, next) => prev);

  // Act
  observable.value = rejectedValue;

  // Assert
  expect(mockCallback).not.toHaveBeenCalled();
  expect(observable.value).toBe(initialValue);
});

test('OnValueChanged triggers event with new value', () => {
  // Arrange
  const initialValue = 10;
  const newValue = 15;
  const observable = new TestObservableValue<number>(initialValue);
  const mockCallback = vi.fn();
  observable.onValueChanged.addEventListener(mockCallback);

  // Act
  observable.value = newValue;

  // Assert
  expect(mockCallback).toHaveBeenCalledWith(initialValue, newValue);
  expect(observable.value).toBe(newValue);
});
