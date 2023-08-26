import { criarUpload, getAllImage, deleteImage, getImageBydId } from "../repositories/repository";
import { deleteFromDisck } from "./deleteImageFromDisck";


//Fazer upload de imagems

export const uploadImage =  async(req,res)=>{
    const{originalname: name, size, key, location:url = ""} = req.file

    //Se o storageType não for o s3 então a url vai ser atribuida à foto a partir da imagem da pasta tmp/uploads
    let imageUrl = url === "" ? `${process.env.APP_URL}/files/${key}` : url;

    const data = {
        nomeArquivo: name,
        tamanho: size,
        key: key,
        url: imageUrl
    }
    try {
        const image = await criarUpload(data)
        res.status(200).send(image)
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
}

//Listar todas imagens
export const getImages = async(req,res)=>{
    try {
        const allImages = await getAllImage()
        res.status(200).send(allImages)
    } catch (error) {
        res.status(200).send(error)
        console.log("Erro ao buscar as imagens no controller: " + error)
    }
}

//Lista imagem por id

export const getImageByItsId =  async(req, res) =>{
    try {
        const getImage = await getImageBydId(Number(req.params.id))
        res.status(200).send(getImage)
    } catch (error) {
        res.status(400).send(error)
        console.log("Erro ao buscar imagem por id no controller: " + error)
    }
}

//Deletar imagem
export const deleteImage = async(req, res)=>{
   
    try {
      
      await deleteFromDisck(Number(req.params.id))
      await deleteImage(Number(req.params.id))
        res.status(200).send()
       
    } catch (error) {
        console.log("Erro ao deletar a imagem no controller: " + error)
        res.status(400).send(error)
    }
}