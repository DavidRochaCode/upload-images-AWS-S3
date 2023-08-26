import express from "express";
import cors from "cors";
import routes from "./routes";
import path from 'path'

require("dotenv").config();

const app = express();

app.use(cors());

//saber lidar com a url encode
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Liberar o acesso às fotos da pasta tmp/uploads --> liberar acessoa a arquivos estáticos
app.use('/files', express.static(path.resolve(__dirname, "..", "tmp", "uploads")))


routes(app);

// Rota de health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Healthy" });
});

app.listen(3000, () => {
  console.log("Servidor iniciado");
});
