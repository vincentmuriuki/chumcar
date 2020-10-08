import Users from '../models/User.js';

class UserService {
  async findUserByEmail(email) {
    const user = await Users.findOne({ where: { email } });
    if (!user) return null;
    const lastLogin = new Date().toISOString();
    await user.update({ lastLogin }, { where: { email } });
    return user
  }
}

export default new UserService();
