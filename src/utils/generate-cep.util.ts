export function generateCEPUtil() {
  const min = Math.pow(10, 8 - 1);
  const max = Math.pow(10, 8) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
