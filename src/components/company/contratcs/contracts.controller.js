import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PREFIX_CONTRACT = {
  1: "CC",
  2: "CV",
  3: "CE",
  4: "CA",
  5: "CP",
};

const getContracts = async (req, res) => {
  const { query } = req;

  try {
    const contracts = await prisma.contract.findMany({
      include: {
        client: true,
        contractProperties: {
          include: {
            property: true,
          },
        },
        contractStatus: true,
        contractType: true,
      },
      orderBy: { createdAt: "asc" },
      where: {
        id: query.contract,
      },
    });
    res.status(200).json({
      results: contracts,
      count: contracts.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getContract = async (req, res) => {
  const { id } = req.params;
  try {
    const contract = await prisma.contract.findUnique({
      where: { id },
      include: {
        client: true,
        contractProperties: {
          include: {
            property: true,
          },
        },
        contractStatus: true,
        contractType: true,
      },
    });
    res.status(200).json({
      result: contract,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const createContract = async (req, res) => {
  try {
    const { body } = req;

    // Obtener el prefijo correspondiente al contractTypeId
    const prefix = PREFIX_CONTRACT[body.contractTypeId];

    // Consulta el último valor autoincrementable en la tabla
    const lastContract = await prisma.contract.findFirst({
      select: { id: true },
      orderBy: { id: "desc" },
      where: { id: { startsWith: prefix } },
    });

    console.log(lastContract);

    // Calcula el nuevo valor autoincrementable
    const lastId = lastContract ? parseInt(lastContract.id.split("_")[1]) : 0;
    const newId = `${prefix}_${lastId + 1}`;

    // Crea el contrato en la base de datos
    const contract = await prisma.contract.create({
      data: {
        ...body,
        id: newId,
      },
    });
    res.status(201).json({
      result: contract,
      message: "Contrato creato con éxito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el contrato" });
  }
};

export { getContracts, createContract, getContract };
