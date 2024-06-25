import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllPropertyCharacteristicsTypes = async (req, res) => {
  try {
    const propertyCharacteristics =
      await prisma.PropertyCharacteristicsTypes.findMany({
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
