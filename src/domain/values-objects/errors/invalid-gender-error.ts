import { DomainError } from '@core/domain/errors/domain-error';

export class InvalidGenderError extends Error implements DomainError {
  constructor(gender: string) {
    super(`Gender: ${gender} is not in a valid format`);
    this.name = 'InvalidGenderError';
  }
}
