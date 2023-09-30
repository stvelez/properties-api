import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProperties = async (req, res) => {
  const { query } = req;

  const filterByBedrooms = () => {
    if (query.bedrooms < 4) {
      return {
        bedrooms: parseInt(query.bedrooms),
      };
    }

    if (query.bedrooms >= 4) {
      return {
        bedrooms: {
          gte: 4,
        },
      };
    }

    return {};
  };

  try {
    const allProperties = await prisma.properties.findMany({
      where: {
        ...filterByBedrooms(),
      },
      include: {
        PropertyImage: true,
        city: true,
        agent: true,
        propertyCharacteristics: true,
        offer: true,
        propertyType: true,
      },
    });
    res.json({
      results: allProperties,
      count: allProperties.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getpropertyById = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await prisma.properties.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        PropertyImage: true,
        city: true,
        agent: true,
        propertyCharacteristics: true,
        offer: true,
        propertyType: true,
      },
    });
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}