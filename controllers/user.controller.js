import Users from '../models/User.js';
import hash from '../utils/hash.js';
import JWTHelper from '../utils/jwt.js';
import Responses from '../utils/response.js';
import userService from '../services/user.service.js';

class UserController {
  async createUser(req, res) {
    const passwordHash = hash.generateSync(req.body.password);
    const userData = {
      firstName: req.body.firstName,
      password: passwordHash,
      lastName: req.body.lastName,
      email: req.body.email,
    };
    const user = await Users.create(userData);
    const token = await JWTHelper.signToken(user);
    const data = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      token,
    };
    return Responses.handleSuccess('201', 'created', res, data);
  }

  async findUser(req, res) {
    const user = await userService.findUserByEmail(req.body.email);
    if (!user) return Responses.handleError(404, 'user does not exist', res);
    if (!hash.compareSync(req.body.password, user.password)) {
      return Responses.handleError(400, 'invalid credentials', res);
    }

    const token = await JWTHelper.signToken(user);
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      token,
    };
    return Responses.handleSuccess(200, 'success', res, data);
  }

  async verifyAccount(req, res) {
    const user = Users.findOne({ where: { id: req.params.id } });
    await user.update(
      {
        isVerified: true,
      },
      { where: { email: user.email } }
    );
    return res.status(200).redirect('/login')
  }
}

export default new UserController();
