import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

class Hash {
  generateSync(plainPassword) {
    return bcrypt.hashSync(plainPassword, 8);
  }

  compareSync(plainPassword, hash) {
    return bcrypt.compareSync(plainPassword, hash);
  }
}

export default new Hash();
