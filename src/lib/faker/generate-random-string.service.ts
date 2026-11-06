import { faker } from '@faker-js/faker';

export function generateRandomStringService(): string {
  return faker.string.alpha({ length: 15 });
}
