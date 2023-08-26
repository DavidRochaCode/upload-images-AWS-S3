const multer = require("multer");
const multerConfig = require("../config/multer");
import {
  uploadImage,
  getImages,
  deleteImage,
  getImageByItsId,
} from "../controllers/controller";

import { deleteFromAmazon } from "../mildwares/deleteFromAmazon";

const uploadRoutes = (app) => {
  //Upload de Imagem
  app.post("/upload", multer(multerConfig).single("file"), uploadImage);
  //Listar Imagens
  app.get("/upload", getImages);
  //Listar Imagem por id
  app.get("/upload/:id", getImageByItsId);
  //Deletar imagem
  app.delete("/upload/:id", deleteFromAmazon, deleteImage);
};

export default uploadRoutes;
