import Users from '../models/User.js'
import hash from '../utils/hash.js'
import JWTHelper from '../utils/jwt.js'
import Responses from '../utils/response.js'

class UserController {
    async createUser(req, res) {
        const passwordHash = hash.generateSync(req.body.password)
        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: passwordHash
        }
        const user = await Users.create(userData)
        const token = await JWTHelper.signToken(user)
        const data = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            token
        }
        return Responses.handleSuccess('201', 'created', res, data)
    }
}

export default new UserController();