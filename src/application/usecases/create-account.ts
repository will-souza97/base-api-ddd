import { AccountRepository } from '@application/repositories/account-repository';
import { Either, left, right } from '@core/logic/either';
import { Account, AccountErrors } from '@domain/entities/account';
import { Email } from '@domain/values-objects/email';
import { Password } from '@domain/values-objects/password';

import { ExistingEmailError } from './errors/existing-email';

type CreateAccountRequest = {
  email: string;
  password: string;
};

type CreateAccountResponse = Either<
  AccountErrors | ExistingEmailError,
  Account
>;

export class CreateAccount {
  constructor(private readonly repository: AccountRepository) {}

  async execute({
    email,
    password,
  }: CreateAccountRequest): Promise<CreateAccountResponse> {
    const emailOrError = Email.create(email);
    const passwordOrError = Password.create(password);

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const accountOrError = Account.create({
      email: emailOrError.value,
      password: passwordOrError.value,
    });

    if (accountOrError.isLeft()) return left(accountOrError.value);

    const emailAlreadyExists = await this.repository.existsEmail(
      emailOrError.value,
    );

    if (emailAlreadyExists) return left(new ExistingEmailError(email));

    const account = accountOrError.value;

    await this.repository.create(account);

    return right(account);
  }
}
