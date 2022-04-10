import { Account } from './account';
import { Customer } from './customer';

describe('Customer Entity', () => {
  describe('ACCEPT', () => {
    it('should be able to create a new costumer valid', () => {
      const name = 'teste';
      const phone = '+1111111111111';
      const gender = 'male';

      expect(
        Customer.create({ accountId: 'id', name, phone, gender }).isRight(),
      ).toBeTruthy();
    });
  });

  describe('REJECT', () => {
    it('should be able to reject create a new costumer with invalid values', () => {
      expect(
        Customer.create({
          accountId: '1',
          name: 't',
          phone: '1111111111111',
          gender: 'male',
        }).isLeft(),
      ).toBeTruthy();

      expect(
        Customer.create({
          accountId: '1',
          name: 'teste',
          phone: '1',
          gender: 'male',
        }).isLeft(),
      ).toBeTruthy();

      expect(
        Customer.create({
          accountId: '1',
          name: 'teste',
          phone: '1111111111111',
          gender: 'm',
        }).isLeft(),
      ).toBeTruthy();
    });
  });
});
