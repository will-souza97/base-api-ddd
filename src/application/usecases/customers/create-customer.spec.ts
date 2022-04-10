import { AccountRepository } from '@application/repositories/account-repository';
import { InMemoryAccountRepository } from '@test/infra/repositories/in-memory-account-repository';

import { CreateCustomer } from './create-customer';
import { ExistingEmailError } from './errors/existing-email';

describe('Create Account', () => {
  let accountRepository: AccountRepository;
  let createCustomer: CreateCustomer;

  beforeEach(() => {
    accountRepository = new InMemoryAccountRepository();
    createCustomer = new CreateCustomer(accountRepository);
  });

  describe('ACCEPT', () => {
    it('should be able to customer new account', async () => {
      const email = 'email@example.com';
      const password = 'test1234';
      const name = 'teste';
      const phone = '+1111111111111';
      const gender = 'male';

      const response = await createCustomer.execute({
        email,
        password,
        name,
        phone,
        gender,
      });

      expect(response.isRight()).toBeTruthy();
    });
  });

  describe('REJECT', () => {
    it('should not be able to create new customer with invalid data', async () => {
      const email = 'email';
      const password = 'pass';
      const name = 't';
      const phone = '+';
      const gender = 'mal';

      const response = await createCustomer.execute({
        email,
        password,
        name,
        phone,
        gender,
      });

      expect(response.isLeft()).toBeTruthy();
    });

    it('should not be able to create new customer with email existent', async () => {
      const email = 'email@example.com';
      const password = 'test1234';
      const name = 'teste';
      const phone = '+1111111111111';
      const gender = 'male';

      await createCustomer.execute({
        email,
        password,
        name,
        phone,
        gender,
      });

      const response = await createCustomer.execute({
        email,
        password,
        name,
        phone,
        gender,
      });

      expect(response.isLeft()).toBeTruthy();
      expect(response.value).toEqual(
        new ExistingEmailError('email@example.com'),
      );
    });
  });
});
