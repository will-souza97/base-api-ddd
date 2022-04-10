import { Account } from './account';

describe('Account Entity', () => {
  describe('ACCEPT', () => {
    it('should be able to create a new account valid', () => {
      const email = 'email@example.com';
      const password = 'test1234';

      expect(Account.create({ email, password }).isRight()).toBeTruthy();
    });
  });

  describe('REJECT', () => {
    it('should be able to reject create a new account with invalid values', () => {
      const email = 'email@example.com';
      const password = 'test1234'.repeat(300);

      expect(Account.create({ email, password }).isLeft()).toBeTruthy();
    });
  });
});
