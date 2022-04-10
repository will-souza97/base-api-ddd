import { Entity } from '@core/domain/entity';
import { Either, left, right } from '@core/logic/either';
import { Email } from '@domain/values-objects/email';
import { InvalidEmailError } from '@domain/values-objects/errors/invalid-email-error';
import { InvalidNameError } from '@domain/values-objects/errors/invalid-name-error';
import { InvalidPasswordError } from '@domain/values-objects/errors/invalid-password-error';
import { Name } from '@domain/values-objects/name';
import { Password } from '@domain/values-objects/password';

type AccountProps = {
  name: Name;
  email: Email;
  password: Password;
};

export type AccountErrors =
  | InvalidNameError
  | InvalidEmailError
  | InvalidPasswordError;

export class Account extends Entity<AccountProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  private constructor(props: AccountProps, id?: string) {
    super(props, id);
  }

  public static create(
    props: AccountProps,
    id?: string,
  ): Either<AccountErrors, Account> {
    const nameOrError = Name.create(props.name.value);
    if (nameOrError.isLeft()) return left(nameOrError.value);

    const emailOrError = Email.create(props.email.value);
    if (emailOrError.isLeft()) return left(emailOrError.value);

    const passwordOrError = Password.create(props.password.value);
    if (passwordOrError.isLeft()) return left(passwordOrError.value);

    const account = new Account(props, id);

    return right(account);
  }
}
