import { Either, left, right } from '@core/logic/either';

import { InvalidGenderError } from './errors/invalid-gender-error';

export class Gender {
  get value(): string {
    return this.gender;
  }

  private constructor(private readonly gender: string) {
    Object.freeze(this);
  }

  public static create(gender = 'other'): Either<InvalidGenderError, Gender> {
    if (!gender || !this.validate(gender.trim())) {
      return left(new InvalidGenderError(gender));
    }

    return right(new Gender(gender));
  }

  public static validate(gender: string) {
    if (gender !== 'male' && gender !== 'female' && gender !== 'other') {
      return false;
    }

    return true;
  }
}
