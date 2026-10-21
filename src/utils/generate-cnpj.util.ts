export function generateCNPJUtil() {
  const min = Math.pow(10, 14 - 1);
  const max = Math.pow(10, 14) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
