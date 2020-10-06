import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

class Hash {
  generateSync(plainPassword) {
    return bcrypt.hashSync(plainPassword, process.env.HASH_SALT_ROUNDS);
  }

  compareSync(plainPassword, hash) {
    return bcrypt.compareSync(plainPassword, hash);
  }
}

export default new Hash();
