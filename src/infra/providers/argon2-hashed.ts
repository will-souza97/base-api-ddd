import { hash, verify } from 'argon2';
import { randomBytes } from 'crypto';

import { Hashed } from '@core/infra/hashed';

export class Argon2Hashed implements Hashed {
  private readonly salt = randomBytes(12);

  async generate(payload: string): Promise<string> {
    return await hash(payload, { salt: this.salt });
  }

  async compare(payload: string, payloadHash: string): Promise<boolean> {
    return await verify(payloadHash, payload, { salt: this.salt });
  }
}

export default new Argon2Hashed();
