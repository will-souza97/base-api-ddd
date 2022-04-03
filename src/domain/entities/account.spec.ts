import { Email } from '@domain/values-objects/email';
import { Password } from '@domain/values-objects/password';

import { Account } from './account';

describe('Account Entity', () => {
  describe('ACCEPT', () => {
    it('should be able to create a new account valid', () => {
      const email = Email.create('email@example.com').value as Email;
      const password = Password.create('test1234').value as Password;

      expect(Account.create({ email, password }).isRight()).toBeTruthy();
    });
  });

  describe('REJECT', () => {
    it('should be able to reject create a new account with invalid values', () => {
      const email = Email.create('emailexamplecom').value as Email;
      const password = Password.create('test1234'.repeat(300))
        .value as Password;

      expect(Account.create({ email, password }).isLeft()).toBeTruthy();
    });
  });
});
