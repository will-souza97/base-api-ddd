import { AccountRepository } from '@application/repositories/account-repository';
import { Either, left, right } from '@core/logic/either';
import { Account, AccountErrors, AccountProps } from '@domain/entities/account';
import {
  Customer,
  CustomerErros,
  CustomerProps,
} from '@domain/entities/customer';

import { ExistingEmailError } from './errors/existing-email';

type CreateAccountRequest = AccountProps & CustomerProps;

type CreateAccountResponse = Either<
  AccountErrors | CustomerErros | ExistingEmailError,
  Customer
>;

export class CreateCustomer {
  constructor(private readonly repository: AccountRepository) {}

  async execute({
    email,
    password,
    name,
    phone,
    gender,
  }: CreateAccountRequest): Promise<CreateAccountResponse> {
    const accountOrError = Account.create({ email, password });

    if (accountOrError.isLeft()) return left(accountOrError.value);

    const emailAlreadyExists = await this.repository.existsEmail(email);

    if (emailAlreadyExists) return left(new ExistingEmailError(email));

    const account = accountOrError.value;

    const customerOrError = Customer.create({
      accountId: account.id,
      name,
      phone,
      gender,
    });

    if (customerOrError.isLeft()) return left(customerOrError.value);

    const customer = customerOrError.value;

    Promise.all([
      await this.repository.create(account),
      await this.repository.create(account),
    ]);

    return right(customer);
  }
}
