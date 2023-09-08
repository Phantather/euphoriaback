import {body} from "express-validator";
import {validationResult} from "express-validator";

export  default function handleValidators (req,res,next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }
    next()
}

export const registerUserValidations = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать минимум 8 символов').isLength({min:8})
]

export const loginUserValidations = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать минимум 8 символов').isLength({min:8})
]

export const productValidations = [
    body('title', 'title').isString(),
    body('description', 'description').isString(),
    body('price', 'price').isString(),
    body('images', 'images').isArray(),
    body('sizes', 'sizes').isArray(),
    body('colors', 'colors').isArray(),
]
