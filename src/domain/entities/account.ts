import { Entity } from '@core/domain/entity';
import { Either, left, right } from '@core/logic/either';
import { Email } from '@domain/values-objects/email';
import { InvalidEmailError } from '@domain/values-objects/errors/invalid-email-error';
import { InvalidPasswordError } from '@domain/values-objects/errors/invalid-password-error';
import { Password } from '@domain/values-objects/password';

type AccountProps = {
  email: Email;
  password: Password;
};

type AccountErrors = InvalidEmailError | InvalidPasswordError;

export class Account extends Entity<AccountProps> {
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
    const emailResult = Email.create(props.email.value);
    if (emailResult.isLeft()) return left(emailResult.value);

    const passwordResult = Password.create(props.password.value);
    if (passwordResult.isLeft()) return left(passwordResult.value);

    const account = new Account(props, id);

    return right(account);
  }
}
