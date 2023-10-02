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
  const { body } = req;
  console.log(body);

  try {
/*     const agent = await prisma.agents.create({
      data: {
        ...body,
      },
    }); */
    res.json('agent');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
