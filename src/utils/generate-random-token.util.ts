import { randomBytes } from 'node:crypto';

export function generateRandomTokenUtil(): string {
  return randomBytes(3).toString('hex');
}
