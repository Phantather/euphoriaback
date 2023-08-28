import {body} from "express-validator";


export const createTodo = [
    body('text', 'Текст должен быть минимум 3 символа и максимум 20').isString().isLength({min: 3, max: 20})
]