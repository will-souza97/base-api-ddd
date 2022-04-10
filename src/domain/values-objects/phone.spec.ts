import { Phone } from './phone';

describe('Phone value object', () => {
  describe('ACCEPT', () => {
    it('should accept valid phone', () => {
      expect(Phone.create('+11111111111111').isRight()).toBeTruthy();
      expect(Phone.create('111111111111').isRight()).toBeTruthy();
      expect(Phone.create('11111111111').isRight()).toBeTruthy();
      expect(Phone.create('1111111111').isRight()).toBeTruthy();
    });
  });

  describe('REJECT', () => {
    it('should reject phones with more than 12 characters or less than 10 characters', () => {
      expect(Phone.create('+111111111111111').isLeft()).toBeTruthy();
      expect(Phone.create('111111111').isLeft()).toBeTruthy();
      expect(Phone.create('numero').isLeft()).toBeTruthy();
    });
  });
});
