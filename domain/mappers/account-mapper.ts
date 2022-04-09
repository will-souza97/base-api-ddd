import { Account } from '@domain/entities/account';
import Argon2Hashed from '@infra/providers/argon2-hashed';

export class AccountMapper {
  // static toDomain(row: PersistenceAccount): Account | void {}

  static async toPersistence(user: Account) {
    return {
      id: user.id,
      email: user.email.value,
      password: Argon2Hashed.generate(user.password.value),
    };
  }
}
