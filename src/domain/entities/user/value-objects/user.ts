import { Entity } from '@core/domain/entity';

type UserProps = {
  name: string;
};

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  public static create(props: UserProps, id?: string): User {
    const user = new User(props, id);

    return user;
  }
}
