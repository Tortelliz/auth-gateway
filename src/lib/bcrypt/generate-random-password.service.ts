import bcrypt from 'bcrypt';

export async function generateRandomPasswordService(): Promise<string> {
  const password = Math.random().toString(36).slice(2);
  return await bcrypt.hash(password, 12);
}
