import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllofferTypes = async (req, res) => {
  try {
    const offerTypes = await prisma.offer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      results: offerTypes,
      count: offerTypes.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving offerTypes",
      error: error.message,
    });
  }
};
