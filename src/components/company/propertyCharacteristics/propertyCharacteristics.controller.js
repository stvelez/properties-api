import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllPropertyCharacteristics = async (req, res) => {
  try {
    const propertyCharacteristics =
      await prisma.propertyCharacteristics.findMany({
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

export const removePropertyCharacteristic = async (req, res) => {
  const { id } = req.params;
  const {characteristicId} = req.body;

  try {
    const currentProperty = await prisma.properties.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        characteristics: true,
      },
    });

    const characteristicToRemove = currentProperty.characteristics.find(
      (characteristic) => characteristic.characteristicId === characteristicId
    );

    await prisma.propertyCharacteristics.delete({
      where: {
        id: characteristicToRemove.id,
      },
    });

    res.json({
      message: "Caracteristica eliminada con exito",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing PropertyCharacteristic",
      error: error.message,
    });
  }
}

export const addPropertyCharacteristic = async (req, res) => {
  console.log('req.body', req.body)
  const { name, slug, characteristicId, idproperty } = req.body;

  const properties = await prisma.properties.findUnique({
    where: {
      id: parseInt(idproperty),
    },
    include: {
      characteristics: {
        include: {
          characteristic: true,
        },
      },
    },
  });


  const existCharacteristic = properties.characteristics.find(
    (characteristic) => characteristic.characteristic.id === parseInt(characteristicId)
  );

  if (existCharacteristic) {
    console.log('existe esta mierda')
    return res.status(400).json({
      message: "Esta caracteristica ya existe",
    });
  }

  try {
    const propertyCharacteristic = await prisma.propertyCharacteristics.create({
      data: {
        characteristicId: characteristicId,
        propertyId: parseInt(idproperty),
      },
    });

    res.json({
      message: "Caracctertistica agregada con exito",
      result: propertyCharacteristic,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding PropertyCharacteristic",
      error: error.message,
    });
  }
}