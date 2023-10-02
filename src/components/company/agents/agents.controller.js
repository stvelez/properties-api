import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllAgents = async (req, res) => {
  try {
    const agents = await prisma.agents.findMany({});

    res.json({
      results: agents,
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
    /*     const userExist = await prisma.agents.findUnique({
      where: {
        email: user.email,
      },
    });

    console.log(userExist); */
    const agent = await prisma.agents.create({
      data: {
        ...user,
        agentRoleId: parseInt(user.agentRoleId),
      },
    });
    res.json(agent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
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
