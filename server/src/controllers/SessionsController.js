import jwt from "jsonwebtoken";
import User from "../models/User";
import { checkPassword } from "../services/auth";
import authConfig from "../config/auth";

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordChecked = await checkPassword(user, password);

    if (!user) {
      return res.status(401).json({ error: "User / password invalid." });
    }

    if(!passwordChecked){
        return res.status(401).json({ error: "User / password invalid." });
    }

    const {id} = user;

    return res.json({
        user:{
            id,
            email
        },
        token: jwt.sign({id}, authConfig.secret, {
            expiresIn:authConfig.expiresIn
        })
    });
  }
}

export default new SessionsController();
