import {App} from '../../src/app';

describe('the app', () => {
  it('says hello', () => {
    expect(new App(null)).toBe('Hello World!');
  });
});
