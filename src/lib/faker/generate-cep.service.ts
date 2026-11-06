import { faker } from '@faker-js/faker';

export function generateCepService(): number {
  return faker.number.int({ min: 8, max: 8 });
}
