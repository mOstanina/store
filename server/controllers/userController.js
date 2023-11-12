const ErrorApi = require("../error/ErrorApi")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
const {User, Order} = require("../models/models")

const generateToken = (id, login, role) =>{
    return jsonwebtoken.sign(
        {id, login, role},
        process.env.SECRET_KEY,
        {expiresIn:"10h"}
    )
}

class UserController {
    async registration (req, res, next) {
        const {login, password, role} = req.body

        if (!login || !password) {
            return next(ErrorApi.badRequest("login or password not found"))
        }

        const isUser = await User.findOne({
            attributes: ["idUser", "login", "password", "role"],
            where: {login}
        })
        if (isUser) {
            return next(ErrorApi.badRequest("login is already used"))
        }

        const hashPass = await bcrypt.hash(password, 5)
        const user = await User.create({login, role, password: hashPass})
        // const order = await Order.create({}) // тут можно сразу и создать что-то типа корзины
        const token = generateToken(user.idUser, user.login, user.role)
        return res.json({token})
    }

    async login (req, res, next){
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})

        if(!user) {
            return next(ErrorApi.internal("user not found"))
        }

        let compPassword = bcrypt.compareSync(password, user.password)

        if(!compPassword) {
            return next(ErrorApi.internal("password is wrong"))
        }

        const token = generateToken(user.idUser, user.login, user.role)
        res.json({token})
    }

    async check (req, res, next){
        const token = generateToken(req.user.idUser, req.user.login, req.user.role)
        res.json({token})
    }
}
module.exports = new UserController()
