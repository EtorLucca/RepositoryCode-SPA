import User from "../models/User";
import { createPasswordHash } from "../services/auth";

class UsersController {
  async index(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json();
      }

      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
  async create(req, res) {
    try {
      const {
        name,
        email,
        password
      } = req.body;

      //----------- Compara email (existente ou não) para criação de usuário
      const user = await User.findOne({ email });

      if (user) {
        return res
          .status(422)
          .json({ message: `User ${email} already exists.` });
      }

      //----------- Criptografia de password
      const encryptedPassword = await createPasswordHash(password);

      //----------- Criação do usuário
      const newUser = await User.create({
        name,
        email,
        password: encryptedPassword,
      });

      return res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { 
        name,
        email, 
        password,
      } = req.body;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json();
      }

      const encryptedPassword = await createPasswordHash(password);

      await user.updateOne({ 
        name,
        email, 
        password: encryptedPassword,
      });

      return res.status(200).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json();
      }

      await user.deleteOne();

      return res.status(200).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
}

export default new UsersController();
