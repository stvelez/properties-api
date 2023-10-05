import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCities = async (req, res) => {
  try {
    const cities = await prisma.cities.findMany();

    res.json({
      results: cities,
      count: cities.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving cities",
      error: error.message,
    });
  }
};
