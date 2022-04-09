import { Hashed } from '@core/infra/hashed';

export class InMemoryHashed implements Hashed {
  async generate(payload: string): Promise<string> {
    return '8932d11641e710d85dee6a79ca9aa2e0';
  }

  async compare(payload: string, payloadHash: string): Promise<boolean> {
    return true;
  }
}
