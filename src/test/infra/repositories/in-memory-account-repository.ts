import { AccountRepository } from '@application/repositories/account-repository';
import { Account } from '@domain/entities/account';
import { Email } from '@domain/values-objects/email';

export class InMemoryAccountRepository implements AccountRepository {
  constructor(private rows: Account[] = []) {}

  async create(data: Account): Promise<void> {
    this.rows.push(data);
  }

  async existsEmail(email: Email): Promise<boolean> {
    return this.rows.some((row) => row.email.value === email.value);
  }
}
