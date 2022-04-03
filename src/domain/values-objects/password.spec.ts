import { Password } from './password';

describe('Password value object', () => {
  describe('ACCEPT', () => {
    it('should accept valid password', () => {
      expect(Password.create('test1234').isRight()).toBeTruthy();
    });
  });

  describe('REJECT', () => {
    it('should reject passwords with more than 255 characters or less than 8 characters', () => {
      expect(Password.create('test1234'.repeat(300)).isLeft()).toBeTruthy();
      expect(Password.create('test').isLeft()).toBeTruthy();
    });
  });
});
