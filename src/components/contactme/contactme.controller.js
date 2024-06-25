import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postContactme = async (req, res) => {
  try {
    const { firstName, lastName, email, message, idProperty } = req.body;

    const contactme = await prisma.contactme.findFirst({
      where: {
        email: "stiben@gmail.com",
      },
    });

    if (contactme && contactme.idProperty === Number(idProperty)) {
      return res
        .status(400)
        .json({ message: "Ya has solicitado información de esta propiedad" });
    }

    const result = await prisma.contactme.create({
      data: {
        idProperty: Number(idProperty),
        firstName,
        lastName,
        email,
        message,
      },
    });

    res.json({
      message: "Mensaje enviado con éxito",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al enviar el mensaje",
      error: error.message,
    });
  }
};
