import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getpropertyContractStatus = async (req, res) => {
  try {
    const propertyContractStatus =
      await prisma.propertyContractStatus.findMany();

    res.json({
      results: propertyContractStatus,
      count: propertyContractStatus.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving propertyContractStatus",
      error: error.message,
    });
  }
};
