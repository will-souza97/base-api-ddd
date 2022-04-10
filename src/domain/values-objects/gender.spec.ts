import { Gender } from './gender';

describe('Gender value object', () => {
  describe('ACCEPT', () => {
    it('should accept valid gender', () => {
      expect(Gender.create('male').isRight()).toBeTruthy();
      expect(Gender.create('female').isRight()).toBeTruthy();
    });
  });

  describe('REJECT', () => {
    it('should reject genders invalid', () => {
      expect(Gender.create('1').isLeft()).toBeTruthy();
      expect(Gender.create('Test').isLeft()).toBeTruthy();
      expect(Gender.create('mAle').isLeft()).toBeTruthy();
      expect(Gender.create('Male').isLeft()).toBeTruthy();
      expect(Gender.create('MALE').isLeft()).toBeTruthy();
      expect(Gender.create('mALE').isLeft()).toBeTruthy();
      expect(Gender.create('Female').isLeft()).toBeTruthy();
      expect(Gender.create('FeMaLe').isLeft()).toBeTruthy();
      expect(Gender.create('feMaLe').isLeft()).toBeTruthy();
    });
  });
});
