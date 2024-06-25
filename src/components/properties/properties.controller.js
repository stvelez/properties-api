import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProperties = async (req, res) => {
  try {
    const { query } = req;
    console.log("query", query);
    const minPrice = req.query.minPrice
      ? parseInt(req.query.minPrice)
      : undefined;
    const maxPrice = req.query.maxPrice
      ? parseInt(req.query.maxPrice)
      : undefined;
    const stratum = req.query.stratum ? parseInt(req.query.stratum) : undefined;

    const order = query.order === "minPrice" ? "asc" : "desc";

    const take = query.take ? parseInt(query.take) : 9;
    const page = query.page ? parseInt(query.page) : 1;

    const filterByBedrooms = () => {
      if (parseInt(query.bedrooms) < 4) {
        return {
          rooms: parseInt(query.bedrooms),
        };
      }

      if (parseInt(query.bedrooms) >= 4) {
        return {
          rooms: {
            gte: 4,
          },
        };
      }

      return {};
    };

    const filterBybathrooms = () => {
      if (parseInt(query.bathrooms) < 4) {
        return {
          bathrooms: parseInt(query.bathrooms),
        };
      }

      if (parseInt(query.bathrooms) >= 4) {
        return {
          bathrooms: {
            gte: 4,
          },
        };
      }

      return {};
    };

    const filterBypropertyType = () => {
      if (query.property) {
        return {
          propertyType: {
            slug: query.property,
          },
        };
      }

      return {};
    };

    const filteerByBathrooms = () => {
      if (query.bathrooms) {
        return {
          bathrooms: parseInt(query.bathrooms),
        };
      }

      return {};
    };

    const filterByParkings = () => {
      if (query.parkings === "0") {
        return {};
      }
      if (query.parkings) {
        return {
          parkings: parseInt(query.parkings),
        };
      }

      return {};
    };

    const filterByOffer = () => {
      if (query.offer) {
        return {
          offer: {
            slug: query.offer,
          },
        };
      }

      return {};
    };

    const filterByCity = () => {
      if (query.city === "all") {
        return {};
      }
      if (query.city) {
        return {
          city: {
            id: parseInt(query.city),
          },
        };
      }

      return {};
    };

    const properties = await prisma.properties.findMany({
      where: {
        ...filterByBedrooms(),
        ...filterBypropertyType(),
        ...filterByOffer(),
        ...filterBybathrooms(),
        ...filteerByBathrooms(),
        ...filterByParkings(),
        ...filterByCity(),
        stratum,
        AND: [
          {
            price: {
              gte: minPrice,
            },
          },
          {
            price: {
              lte: maxPrice,
            },
          },
        ],
      },
      include: {
        PropertyImage: true,
        city: true,
        agent: true,
        offer: true,
        propertyType: true,
        contractStatus: true,
        stateProperty: true,
        characteristics: true,
      },
      orderBy: [
        {
          price: order,
        },
        {
          createdAt: "desc",
        },
      ],
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

    console.log("properties", Math.ceil(properties.length / take));
    res.json({
      results: dataFormatted.slice((page - 1) * take, page * take),
      count: properties.length,
      pagination: {
        page,
        limit: take,
        pages: Math.ceil(properties.length / take),
        lastPage: Math.ceil(properties.length / take),
        viewLastPage: Math.ceil(properties.length / take) > 5,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener las propiedades" });
  }
};

export const getpropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await prisma.properties.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        PropertyImage: true,
        city: true,
        agent: true,
        offer: true,
        propertyType: true,
        characteristics: {
          include: {
            characteristic: true,
          },
        },
      },
    });
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
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
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
