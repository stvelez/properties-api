import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllPropertyCharacteristics = async (req, res) => {
  try {
    const propertyCharacteristics =
      await prisma.propertyCharacteristics.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json({
      results: propertyCharacteristics,
      count: propertyCharacteristics.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving propertyCharacteristics",
      error: error.message,
    });
  }
};
