import UsersModel from "../../models/users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req,res) => {
    try {

        const {password, ...other} = req.body

        const salt = await bcrypt.genSalt(10)

        const hash = await bcrypt.hash(password, salt)

        const doc = new UsersModel({
            ...other,
            passwordHash: hash
        })

        const user = await doc.save()

        const token = jwt.sign({
            _id: user.id,
        }, 'lol123', {expiresIn: '90d'})

        const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData,
            token
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться'
        })
    }
}


export const login = async (req, res) => {
    try {

        const user = await UsersModel.findOne({email: req.body.email})
        if (!user) {
            return res.status(404).json({
                message: 'Такого пользователя нет'
            })
        }

        const invalidPassword = await bcrypt.compare(req.body.password, user.passwordHash)

        if (!invalidPassword) {
            return res.status(404).json({
                message: 'Неверный логин или пароль'
            })
        }

        const token = jwt.sign({
            _id: user._id,
        }, 'lol123', {expiresIn: '90d'})

        const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData,
            token
        })

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось войти'
        })
    }
}