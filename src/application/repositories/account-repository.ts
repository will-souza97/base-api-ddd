import { AsyncMaybe } from '@core/logic/maybe';
import { Account } from '@domain/entities/account';
import { Email } from '@domain/values-objects/email';

export interface AccountRepository {
  create(data: Account): Promise<void>;
  existsEmail(email: Email): Promise<boolean>;
  existsId(id: string): Promise<boolean>;
  findByEmail(email: Email): AsyncMaybe<Account>;
  findById(id: string): AsyncMaybe<Account>;
}
