import { prisma } from "../services/index";
const aws =  require('aws-sdk')

export const deleteFromAmazon = async (req, res, next) => {
    const s3 = new aws.S3();

    if (process.env.STORAGE_TYPE === 's3') {
        try {
            const getProductKey = await prisma.image.findUnique({
                where: {
                    id: Number(req.params.id)
                }
            });

            if (getProductKey) {
                await s3.deleteObject({
                    Bucket: 'uploadspaceboxteste',
                    Key: getProductKey.key
                }).promise();

                // Após a exclusão bem-sucedida, chame a próxima função (deleteImage)
                next();
            } else {
                return res.status(404).json({ error: "Imagem não encontrada" });
            }
        } catch (error) {
            console.log("Erro ao deletar a imagem da Amazon: " + error);
            return res.status(400).send(error);
        }
    } else {
        
        next();
    }
}

    
      
