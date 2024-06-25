import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPropertyStatus = async (req, res) => {
  try {
    const propertyStatus = await prisma.statesProperty.findMany();
    console.log(propertyStatus);
    res.json({
      results: propertyStatus,
      count: propertyStatus.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving propertyStatus",
      error: error.message,
    });
  }
};

export { getPropertyStatus };
