import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getClients = async (req, res) => {
  try {
    const clients = await prisma.client.findMany();

    res.json({
      results: clients,
      count: clients.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving clients",
      error: error.message,
    });
  }
};

export const getClientById = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await prisma.client.findUnique({
      where: {
        id,
      },
    });

    res.json(client);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving client",
      error: error.message,
    });
  }
}