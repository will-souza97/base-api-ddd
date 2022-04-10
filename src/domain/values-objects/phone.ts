import { Either, left, right } from '@core/logic/either';

import { InvalidPhoneError } from './errors/invalid-phone-error';

export class Phone {
  get value(): string {
    return this.phone;
  }

  private constructor(private readonly phone: string) {
    Object.freeze(this);
  }

  public static create(phone: string): Either<InvalidPhoneError, Phone> {
    if (!phone || !this.validate(phone.trim())) {
      return left(new InvalidPhoneError(phone));
    }

    return right(new Phone(phone));
  }

  public static validate(phone: string) {
    const pattern = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;

    if (phone.length > 15 || phone.length < 10 || !pattern.test(phone)) {
      return false;
    }

    return true;
  }
}
