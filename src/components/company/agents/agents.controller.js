import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

export const getAllAgents = async (req, res) => {
  try {
    const agents = await prisma.agents.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      results: agents,
      count: agents.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving agents",
      error: error.message,
    });
  }
};

export const createAgent = async (req, res) => {
  try {
    const user = req.body;
    console.log(user);
    const emailExist = await prisma.agents.findUnique({
      where: {
        email: user.email,
      },
    });

    if(emailExist) return res.status(400).json({message: "Ya existe un usuario con ese correo"})

    const userExist = await prisma.agents.findUnique({
      where: {
        userName: user.userName,
      },
    });

    if(userExist) return res.status(400).json({message: "Ya existe este nombre de usuario"})

    if (user.password !== user.passwordConfirm) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const { passwordConfirm, role,  ...rest } = user;
    const agent = await prisma.agents.create({
      data: {
        ...rest,
        agentRoleId: parseInt(role),
        password: hashedPassword,
        token: uuid(),
      },
    });

    res.json({
      message: "Usuario creado con éxito",
      agent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creando el usuario", error: error.message });
  }
};

export const deleteAgentPermanent = async (req, res) => {
  const { id } = req.params;
  try {
    const agent = await prisma.agents.delete({
      where: {
        id,
      },
    });
    res.json(agent)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
