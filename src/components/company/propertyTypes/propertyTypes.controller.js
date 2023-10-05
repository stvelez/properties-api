import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllpropertyTypes = async (req, res) => {
  try {
    const propertyTypes = await prisma.propertyTypes.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      results: propertyTypes,
      count: propertyTypes.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving propertyTypes",
      error: error.message,
    });
  }
};
