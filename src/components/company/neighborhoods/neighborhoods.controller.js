import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getNeighborhoods = async (req, res) => {
  try {
    const neighborhoods = await prisma.neighborhood.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      results: neighborhoods,
      count: neighborhoods.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving neighborhoods",
      error: error.message,
    });
  }
};
