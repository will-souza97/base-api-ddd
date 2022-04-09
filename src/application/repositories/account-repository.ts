import { Account } from '@domain/entities/account';
import { Email } from '@domain/values-objects/email';

export interface AccountRepository {
  create(data: Account): Promise<void>;
  existsEmail(email: Email): Promise<boolean>;
}
