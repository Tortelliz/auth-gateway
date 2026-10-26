import bcrypt from 'bcrypt';

export async function generateRandomHashStringService(): Promise<string> {
  const str = Math.random().toString(36).slice(2);
  return await bcrypt.hash(str, 12);
}
