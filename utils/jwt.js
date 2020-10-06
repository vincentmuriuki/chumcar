import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

class tokenizer {
  async signToken(user) {
    return JWT.sign(
      {
        email: user.email,
        name: user.firstName,
        userId: user.id,
        verified: user.isVerified,
        role: user.role,
      },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
  }

  async decodeToken(token) {
    const data = JWT.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return { error: err.message };
      return decoded;
    });
    return data;
  }
}

export default new tokenizer();
