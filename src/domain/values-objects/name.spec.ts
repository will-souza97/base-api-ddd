import { Name } from './name';

describe('Name value object', () => {
  describe('ACCEPT', () => {
    it('should accept valid name address', () => {
      expect(Name.create('test test').isRight()).toBeTruthy();
    });
  });

  describe('REJECT', () => {
    it('should reject names with more than 255 characters or less than 3 characters', () => {
      expect(Name.create('test'.repeat(300)).isLeft()).toBeTruthy();
      expect(Name.create('te').isLeft()).toBeTruthy();
    });
  });
});
