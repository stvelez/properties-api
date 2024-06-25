import { prisma } from "../../../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const agent = await prisma.agents.findUnique({
      where: {
        email,
      },
    });

    if (!agent) {
      return res.status(404).json({
        message: "Correo o contraseña incorrectos",
      });
    }

    const validPassword = await bcrypt.compare(password, agent.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Correo o contraseña incorrectos",
      });
    }

    const token = jwt.sign(
      {
        id: agent.id,
        email: agent.email,
        user: agent.userName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    console.log("token", token);

    res.json({
      message: "Login successful",
      token,
      user: agent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error logging in company",
      error: error.message,
    });
  }
};
