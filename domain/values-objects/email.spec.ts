import { Email } from './email';

describe('Email value object', () => {
  describe('ACCEPT', () => {
    it('should accept valid email address', () => {
      expect(Email.create('email@example.com').isRight()).toBeTruthy();
    });
  });

  describe('REJECT', () => {
    it('should reject emails with more than 255 characters', () => {
      expect(
        Email.create('email@example.com'.repeat(300)).isLeft(),
      ).toBeTruthy();
    });

    it('should reject invalid email address', () => {
      expect(Email.create('emailexample.com').isLeft()).toBeTruthy();

      expect(Email.create('emailexamplecom').isLeft()).toBeTruthy();

      expect(
        Email.create(`${'email'.repeat(65)}@example.com`).isLeft(),
      ).toBeTruthy();

      expect(
        Email.create(`email@${'example'.repeat(65)}.com`).isLeft(),
      ).toBeTruthy();
    });
  });
});
