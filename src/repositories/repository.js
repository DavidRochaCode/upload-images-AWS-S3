import { prisma } from "../services/index";

//Fazer o upload da imagem
export const criarUpload = async (data) => {
  try {
    const upload = await prisma.image.create({ data });
    return upload;
  } catch (error) {
    console.log(error);
  }
};

//Listar as imagens

export const getAllImage = async () => {
  try {
    const getImages = await prisma.image.findMany({});
    return getImages;
  } catch (error) {
    console.log("Erro ao buscar as fotos no repository: " + error);
  }
};

//Listar imagem por id

export const getImageBydId = async (id) => {
  const image = await prisma.image.findUnique({
    where: {
      id,
    },
  });
  return image;
};

//Deletar imagem por id

export const deleteImage = async (id) => {
  try {
    const deleteI = await prisma.image.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log("Erro ao deletar a imagem no repósitory: " + error);
  }
};
