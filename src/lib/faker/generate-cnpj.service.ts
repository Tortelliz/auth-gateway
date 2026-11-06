import { faker } from '@faker-js/faker';

export function generateCnpjService(): number {
  return faker.number.int({ min: 14, max: 14 });
}
