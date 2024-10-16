import { describe, expect, it } from 'vitest';
describe('test subtract addition', () => {
  it('addition ', () => {
    expect(sum(1, 2)).toBe(3);
  });
});

const sum = (a: number, b: number) => {
  return a + b;
};
