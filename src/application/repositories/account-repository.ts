import { AsyncMaybe } from '@core/logic/maybe';
import { Account } from '@domain/entities/account';

export interface AccountRepository {
  create(data: Account): Promise<void>;
  existsEmail(email: string): Promise<boolean>;
  existsId(id: string): Promise<boolean>;
  findByEmail(email: string): AsyncMaybe<Account>;
  findById(id: string): AsyncMaybe<Account>;
}
