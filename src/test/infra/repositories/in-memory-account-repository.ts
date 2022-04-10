import { AccountRepository } from '@application/repositories/account-repository';
import { AsyncMaybe } from '@core/logic/maybe';
import { Account } from '@domain/entities/account';

export class InMemoryAccountRepository implements AccountRepository {
  constructor(private rows: Account[] = []) {}

  async create(data: Account): Promise<void> {
    this.rows.push(data);
  }

  async existsEmail(email: string): Promise<boolean> {
    return this.rows.some((row) => row.email === email);
  }

  async findByEmail(email: string): AsyncMaybe<Account> {
    return this.rows.find((row) => row.email === email);
  }

  async existsId(id: string): Promise<boolean> {
    return this.rows.some((row) => row.id === id);
  }

  async findById(id: string): AsyncMaybe<Account> {
    return this.rows.find((row) => row.id === id);
  }
}
