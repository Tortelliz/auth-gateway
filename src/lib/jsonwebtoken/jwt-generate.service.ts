import jwt from 'jsonwebtoken';

export function jwtGenerateService(content: any) {
  return jwt.sign(content, process.env.JWT_SECRET as string);
}
