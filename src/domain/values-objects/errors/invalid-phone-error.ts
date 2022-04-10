import { DomainError } from '@core/domain/errors/domain-error';

export class InvalidPhoneError extends Error implements DomainError {
  constructor(phone: string) {
    super(`Phone: ${phone} is not in a valid format`);
    this.name = 'InvalidPhoneError';
  }
}
