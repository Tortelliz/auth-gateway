import bcrypt from 'bcrypt';

export async function CompareService(
  rawString: string,
  hashedString: string,
): Promise<boolean> {
  return await bcrypt.compare(rawString, hashedString);
}
