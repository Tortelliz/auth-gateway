import bcrypt from 'bcrypt';

export async function hashService(rawString: string): Promise<string> {
  return await bcrypt.hash(rawString, 12);
}
