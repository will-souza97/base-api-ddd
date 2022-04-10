import { Entity } from '@core/domain/entity';
import { Either, left, right } from '@core/logic/either';
import { InvalidGenderError } from '@domain/values-objects/errors/invalid-gender-error';
import { InvalidNameError } from '@domain/values-objects/errors/invalid-name-error';
import { InvalidPhoneError } from '@domain/values-objects/errors/invalid-phone-error';
import { Gender } from '@domain/values-objects/gender';
import { Name } from '@domain/values-objects/name';
import { Phone } from '@domain/values-objects/phone';

export type CustomerProps = {
  accountId?: string;
  name: string;
  phone: string;
  gender?: string;
};

export type CustomerErros =
  | InvalidNameError
  | InvalidPhoneError
  | InvalidGenderError;

export class Customer extends Entity<CustomerProps> {
  private constructor(props: CustomerProps, id?: string) {
    super(props, id);
  }

  public static create(
    props: CustomerProps,
    id?: string,
  ): Either<CustomerErros, Customer> {
    const nameOrError = Name.create(props.name);
    if (nameOrError.isLeft()) return left(nameOrError.value);

    const phoneOrError = Phone.create(props.phone);
    if (phoneOrError.isLeft()) return left(phoneOrError.value);

    const genderOrError = Gender.create(props.gender);
    if (genderOrError.isLeft()) return left(genderOrError.value);

    const customer = new Customer(props, id);

    return right(customer);
  }
}
