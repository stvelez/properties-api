import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProperties = async (req, res) => {
  const { query } = req;

  const minPrice = req.query.minPrice ? parseInt(req.query.minPrice) : undefined;
  const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice) : undefined;
  const stratum = req.query.stratum ? parseInt(req.query.stratum) : undefined;


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
    const properties = await prisma.properties.findMany({
      where: {
        ...filterByBedrooms(),
        stratum,
        AND: [
            {
              price: {
                gte: minPrice
              },
            },
            {
              price: {
                lte: maxPrice
              },
            },
          ],
      },
      include: {
        PropertyImage: true,
        city: true,
        agent: true,
        propertyCharacteristics: true,
        offer: true,
        propertyType: true,
        propertyContractStatus: true,
        stateProperty: true,
      },
    });

    const dataFormatted = properties.map((property) => {
      const { city, PropertyImage, latitude, longitude, createdAt, ...rest } =
        property;
      const data = {
        ...rest,
        createdAt,
        media: {
          videos: [],
          photos: PropertyImage.map((image) => ({
            ...image,
          })),
        },
        location: {
          city: city,
          latitude,
          longitude,
        },
        isRecent:
          new Date(createdAt).getTime() > new Date().getTime() - 86400000 * 2,
      };
      return data;
    });

    res.json({
      results: dataFormatted,
      count: properties.length,
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
};

export const createProperty = async (req, res) => {
  const { body } = req;
console.log(body)
  try {
/*       const property = await prisma.properties.create({
        data: {
          ...body,
        },
      }); */
    res.json('property');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};