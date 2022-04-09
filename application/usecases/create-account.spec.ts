import { AccountRepository } from '@application/repositories/account-repository';
import { InMemoryAccountRepository } from '@test/infra/repositories/in-memory-account-repository';

import { CreateAccount } from './create-account';
import { ExistingEmailError } from './errors/existing-email';

describe('Create Account', () => {
  let accountRepository: AccountRepository;
  let createAccount: CreateAccount;

  beforeEach(() => {
    accountRepository = new InMemoryAccountRepository();
    createAccount = new CreateAccount(accountRepository);
  });

  describe('ACCEPT', () => {
    it('should be able to create new account', async () => {
      const email = 'email@example.com';
      const password = 'test1234';

      const response = await createAccount.execute({ email, password });

      expect(response.isRight()).toBeTruthy();
    });

    it('should be able to create new account with password hashed', async () => {
      const email = 'email@example.com';
      const password = 'test1234';

      const response = await createAccount.execute({ email, password });

      expect(response.isRight()).toBeTruthy();
    });
  });

  describe('REJECT', () => {
    it('should not be able to create new account with invalid data', async () => {
      const email = 'email';
      const password = 'pass';

      const response = await createAccount.execute({ email, password });

      expect(response.isLeft()).toBeTruthy();
    });

    it('should not be able to create new account with email existent', async () => {
      const email = 'email@example.com';
      const password = 'test1234';

      await createAccount.execute({
        email,
        password,
      });

      const response = await createAccount.execute({
        email,
        password,
      });

      expect(response.value).toEqual(
        new ExistingEmailError('email@example.com'),
      );
    });
  });
});
