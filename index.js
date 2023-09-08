import express from 'express'
import mongoose from "mongoose";
import cors from "cors";
import {login, register} from "./controller/usersMongo/usersMongo.js";
import handleValidators, {
    registerUserValidations,
    loginUserValidations,
    productValidations
} from "./validations/validations.js";
import {createProduct, getAllProducts} from "./controller/usersMongo/productsMongo.js";

const api = express()

api.use(cors({
    origin: "*"
}))
api.use(express.json());

api.post('/register', registerUserValidations, handleValidators , register)
api.post('/login', loginUserValidations, handleValidators ,  login)

api.post('/api/product',productValidations,handleValidators, createProduct)
api.get('/products', getAllProducts)

const mongoDBPassword = 'Asd12345'

mongoose.connect(`mongodb+srv://ouuakdilkg:${mongoDBPassword}@euphoria.jqgojtg.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log('Mongo DB успешно запущен'))
    .catch((err) =>  console.log('Ошибка при запуске Mongo DB ' ,err))


const PORT = 8080

api.listen(PORT, () => {
    console.log(`Сервер запущен на порту http://localhost:${PORT}`)
})