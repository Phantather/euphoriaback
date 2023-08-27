import express from 'express'
import {getAllUsers, getOneUser} from "./controller/users/users.js";

const api = express()

const PORT = 8080

api.get('/users', getAllUsers)
api.get('/users/:id', getOneUser)

api.listen(8080, () => {
    console.log(`server is done on http://localhost:${PORT}`)
})

