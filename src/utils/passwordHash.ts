const bcrypt = require('bcrypt');

async function generateSalt(rounds: number): Promise<string> {
  const salt = await bcrypt.genSalt(rounds);
  return salt;
}

export async function hashPassword(
  password: string,
  salt: number
): Promise<string> {
  return bcrypt.hash(password, await generateSalt(salt));
}
