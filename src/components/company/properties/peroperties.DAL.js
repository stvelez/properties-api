import { PrismaClient } from "@prisma/client";
import { filterByField } from "./utils/filters.js";

const prisma = new PrismaClient();

const bathrooms = (query) => {
  if(parseInt(query.bathrooms) >= 4) {
    return {
      bathrooms: {
        gte: parseInt(query.bathrooms)
      }
    }
  }
  if(parseInt(query.bathrooms) < 4) {
    return {
      bathrooms: parseInt(query.bathrooms)
    }
  }
  
  return undefined
}
export const Properties = async ({ query }) => {
  const minPrice = query.minPrice ? parseInt(query.minPrice) : undefined;
  const maxPrice = query.maxPrice ? parseInt(query.maxPrice) : undefined;
  const stratum = query.stratum ? parseInt(query.stratum) : undefined;
  const city = query.city ? query.city : undefined;
  const propertyType = query.propertyType ? query.propertyType : undefined;
  const rooms = query.rooms ? parseInt(query.rooms) : undefined;
  const parkings = query.parkings ? parseInt(query.parkings) : undefined;

  console.log(query);

  const properties = await prisma.properties.findMany({
    where: {
      ...filterByField({query, field: "rooms"}),
      ...filterByField({query, field: "rooms"}),
      ...filterByField({query, field: "parkings"}),
      ...filterByField({query, field: "stateId"}),
      ...bathrooms(query),
      stratum,
      parkings,
      rooms,
      city: {
        city: city,
      },
      propertyType: {
        slug: propertyType,
      },
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
      neighborhood: true,
      agent: true,
      offer: true,
      propertyType: true,
      contractStatus: true,
      stateProperty: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return properties;
};
