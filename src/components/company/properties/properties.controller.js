// import { PrismaClient } from "@prisma/client";
import { Properties } from "./peroperties.DAL.js";
import { prisma } from "../../../db.js";
import fs from "fs";
import cloudinary from "../../../helpers/cloudinary/index.js";

// const prisma = new PrismaClient({
//   interactiveTransactionTimeout: 10000
// });

const getAllProperties = async (req, res) => {
  try {
    const { query } = req;

    const properties = await Properties({ query });

    const dataFormatted = properties.map((property) => {
      const {
        city,
        PropertyImage,
        neighborhood,
        latitude,
        longitude,
        createdAt,
        characteristics,
        ...rest
      } = property;
      const data = {
        ...rest,
        createdAt,
        media: {
          videos: [],
          photos: PropertyImage.map((image) => ({
            ...image,
          })),
        },
        characteristics: characteristics ? characteristics.split("|") : [],
        location: {
          city: city,
          latitude,
          longitude,
          neighborhood,
        },
        isRecent:
          new Date(createdAt).getTime() > new Date().getTime() - 86400000 * 2,
      };
      return data;
    });

    return res.json({
      results: dataFormatted,
      count: properties.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error al obtener las propiedades",
      error: error.message,
    });
  }
};

const getpropertyById = async (req, res) => {
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
        offer: true,
        propertyType: true,
        client: true,
        characteristics: {
          include: {
            characteristic: true,
          },
        },
      },
    });

    if (!property) {
      return res.status(404).json({ message: "Propiedad no encontrada" });
    }
    const {
      city,
      PropertyImage,
      client,
      latitude,
      longitude,
      createdAt,
      ...rest
    } = property;
    const data = {
      ...rest,
      createdAt,
      client,
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
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const createProperty = async (req, res) => {
  try {
    const user = "74dec7e9-8419-4854-b111-5b657e8c3076";
    const {
      title,
      description,
      price,
      propertyType,
      address,
      offer,
      rooms,
      parkings,
      floor,
      adminIncluded,
      administration,
      characteristics,
      client,
      contractStatus,
      city,
      agent,
      neighborhood,
      area,
      bathrooms,
      antiquity,
      ...rest
    } = req.body;
    console.log(req.body);

    const newProperty = await prisma.$transaction(async (prismaClient) => {
      const clientResult = await prisma.client.upsert({
        where: {
          document: client.document,
        },
        create: {
          document: client.document,
          name: client.name,
        },
        update: {
          name: client.name,
        },
      });
      const property = await prisma.properties.create({
        data: {
          title,
          description,
          price: parseInt(price),
          address,
          area: parseInt(area),
          administration: parseInt(administration),
          adminIncluded: adminIncluded,
          antiquity: parseInt(antiquity),
          createdById: user,
          floor: parseInt(floor),
          parkings: parseInt(parkings),
          rooms: parseInt(rooms),
          bathrooms: parseInt(bathrooms),
          agent: {
            connect: {
              id: agent,
            },
          },
          propertyType: {
            connect: {
              id: parseInt(propertyType),
            },
          },
          client: {
            connect: {
              id: clientResult.id,
            },
          },
          neighborhood: {
            connect: {
              id: parseInt(neighborhood),
            },
          },
          city: {
            connect: {
              id: parseInt(city),
            },
          },
          contractStatus: {
            connect: {
              id: parseInt(contractStatus),
            },
          },
          offer: {
            connect: {
              id: parseInt(offer),
            },
          },
        },
      });

      const propertyCharacteristics =
        await prismaClient.propertyCharacteristics.createMany({
          data: characteristics.map(({ characteristicId }) => ({
            characteristicId: parseInt(characteristicId),
            propertyId: property.id, // Asigna el id de la propiedad creada
          })),
        });

      return {
        property,
        clientResult,
        propertyCharacteristics,
      };
    });

    return res.json({
      message: "Propiedad creada con éxito",
      results: {
        id: newProperty.property.id,
      },
    });
  } catch (error) {
    console.log("---->", error);

    return res.status(500).json({
      message: "Error al crear la propiedad",
      error: error.message,
    });
  }
};

const updateProperty = async (req, res) => {
  try {
    const user = "74dec7e9-8419-4854-b111-5b657e8c3076";
    const {
      id,
      title,
      description,
      price,
      address,
      building,
      propertyType,
      clientId,
      offer,
      rooms,
      parkings,
      floor,
      adminIncluded,
      administration,
      characteristics,
      client,
      contractStatus,
      city,
      agent,
      neighborhood,
      area,
      bathrooms,
      antiquity,
      location,
      ...rest
    } = req.body;
    // console.log(req.body);

    const updateProperty = await prisma.$transaction(async (prismaClient) => {
      // const clientResult = await prisma.client.upsert({
      //   where: {
      //     document: client.document,
      //   },
      //   create: {
      //     document: client.document,
      //     name: client.name,
      //     cellphone: client.cellphone,
      //   },
      //   update: {
      //     name: client.name,
      //     cellphone: client.cellphone,
      //   },
      // });
      const property = await prisma.properties.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title: title,
          description: description,
          price: parseInt(price),
          address,
          building,
          cityId: parseInt(location.city),
          propertyTypeId: parseInt(propertyType),
          offerId: parseInt(offer),
          area: parseInt(area),
          stratum: parseInt(rest.stratum),
          rooms: parseInt(rooms),
          floor: parseInt(floor),
          bathrooms: parseInt(bathrooms),
          parkings: parseInt(parkings),
          adminIncluded: adminIncluded,
          administration: parseInt(administration),
          antiquity: parseInt(antiquity),
          latitude: parseFloat(location.latitude),
          longitude: parseFloat(location.longitude),
          contractStatusId: parseInt(contractStatus),
          clientId,
          neighborhoodId:
            neighborhood !== "" ? parseInt(neighborhood) : undefined,
          agentId: agent,
        },
      });

      // const propertyCharacteristics = await prismaClient.propertyCharacteristics.createMany({
      //   data: characteristics.map((characteristic) => ({
      //     characteristicId: parseInt(characteristic.id),
      //     propertyId: property.id, // Asigna el id de la propiedad creada
      //   })),
      // });

      return {
        property,
        // propertyCharacteristics,
        // clientResult,
      };
    });
    res.json({
      message: "Propiedad actualizada con éxito",
      results: updateProperty,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al actualizar la propiedad",
      error: error.message,
    });
  }
};

const deletePermanentlyProperty = async (req, res) => {
  const { id } = req.params;

  try {
    // const property = await prisma.properties.delete({
    //   where: {
    //     id: parseInt(id),
    //   },
    // });

    res.json({
      message: "Propiedad eliminada con éxito",
      results: property,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeAllCharacteristics = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await prisma.properties.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        characteristics: true,
      },
    });

    const propertyCharacteristics =
      await prisma.propertyCharacteristics.deleteMany({
        where: {
          propertyId: parseInt(id),
        },
      });

    res.json({
      message: "Caracteristicas eliminadas con éxito",
      results: propertyCharacteristics,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function uploadImage(image) {
  try {
    const readStream = fs.createReadStream(image.path);

    const result = await new Promise((resolve, reject) => {
      readStream.pipe(
        cloudinary.uploader.upload_stream(
          { tags: "basic_sample" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result, image);
            }
          }
        )
      );
    });
    return result;
  } catch (error) {
    console.error("Error al subir imagen a Cloudinary:", error);
    throw error;
  }
}

const updateImageProperty = async (req, res) => {
  const { id } = req.params;
  console.log("req.files", id);
  try {
    const images =
      req?.files.map((image) => ({
        url: image.path,
        propertyId: parseInt(id),
        path: image.path,
      })) || [];

    if (images.length === 0) {
      return res.status(400).json({ message: "No se subieron imagenes" });
    }

    const result = Promise.all(images.map(uploadImage));

    const resultImages = await result;

    const newImages = await prisma.propertyImage.createMany({
      data: resultImages.map((image) => ({
        name: image.public_id,
        url: image.secure_url,
        idProperty: parseInt(id),
        publicId: image.public_id,
      })),
    });

    console.log("newImages ---->", newImages);

    res.json({
      message: "Imagenes actualizadas con éxito",
      // results: newImages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteImageProperty = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log("req.body", body);
  try {
    const image = await prisma.propertyImage.delete({
      where: {
        id: parseInt(body.id),
      },
    });

    const result = await cloudinary.uploader.destroy(
      body.publicId,
      function (result) {
        console.log(result);
      }
    );
    console.log("result ---->", body.id, result);
    res.json({
      message: "Imagen eliminada con éxito",
      // results: image,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const existProperty = await prisma.properties.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existProperty) {
      return res.status(404).json({ message: "Propiedad no encontrada" });
    }

    const property = await prisma.properties.update({
      where: {
        id: parseInt(id),
      },
      data: {
        stateId: 2,
      },
    });

    res.json({
      message: "Propiedad eliminada con éxito",
      results: property,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const activeProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const existProperty = await prisma.properties.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existProperty) {
      return res.status(404).json({ message: "Propiedad no encontrada" });
    }

    const property = await prisma.properties.update({
      where: {
        id: parseInt(id),
      },
      data: {
        stateId: 0,
      },
    });

    res.json({
      message: "Propiedad activada con éxito",
      results: property,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

export {
  getAllProperties,
  getpropertyById,
  createProperty,
  updateProperty,
  deletePermanentlyProperty,
  removeAllCharacteristics,
  updateImageProperty,
  deleteImageProperty,
  deleteProperty,
  activeProperty,
};
