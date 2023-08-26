const fs = require('fs')
const path = require('path')
const{promisify} = require('util')
import { prisma } from "../services/index";

export const deleteFromDisck = async (id, next) => {
    if(process.env.STORAGE_TYPE === 'local'){

        try {
            const getProductKey = await prisma.image.findUnique({
                where: {
                   id
                }
            }); 
            try {
                promisify(fs.unlink)(path.resolve(__dirname, '..','..', 'tmp', 'uploads', getProductKey.key))
                
            } catch (error) {
                console.log("Erro ao apagar a foto do disco: " + error)
            }
        } catch (error) {
            console.log("Ocorreu um erro: " + error)
        }
        
    }}