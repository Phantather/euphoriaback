import express from 'express'
import {createOneUser, getAllUsers, getOneUser, updateOneUser} from "./controller/users/users.js";
import mongoose from "mongoose";

const api = express()
api.use(express.json())

mongoose.connect('mongodb+srv://ouuakdilkg:Asd12345@euphoria.jqgojtg.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Mongo DB is Start'))
    .catch((error) => console.log(error))

const PORT = 8080

api.get('/users', getAllUsers)
api.get('/users/:id', getOneUser)
api.post('/users', createOneUser)
api.patch('/users/:id', updateOneUser)
api.listen(8080, () => {
    console.log(`server is done on http://localhost:${PORT}`)
})

