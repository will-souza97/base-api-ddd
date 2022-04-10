import { Entity } from '@core/domain/entity';

type CustomerProps = {
  phone: string;
  birthDate?: string;
  gender?: 'Male' | 'Female';
  // status?: 'Active' | 'Inactive';
};

export class Customer extends Entity<CustomerProps> {
  private constructor(props: CustomerProps, id?: string) {
    super(props, id);
  }

  public static create(props: CustomerProps, id?: string): void {}
}
