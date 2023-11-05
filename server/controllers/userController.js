const ErrorApi = require("../error/ErrorApi")

class UserController {
    async registration (req, res){

    }

    async login (req, res){

    }

    async check (req, res, next){
        const {id} = req.query
        if(!id){
            return next(ErrorApi.badRequest("ID does not exist"))
        }
        res.json(id)
    }
}
module.exports = new UserController()
