import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllStratums = async (req, res) => {
  try {
    const stratums = await prisma.stratum.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      results: stratums,
      count: stratums.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving stratums",
      error: error.message,
    });
  }
};
