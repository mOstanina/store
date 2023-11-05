const {Product} = require("../models/models")
const ErrorApi = require("../error/ErrorApi")
const uuid = require("uuid")
const path = require("path")

class ProductController {
    async create(req, res, next){
        try{
            const {weight, size, idManufacturer, price, category} = req.body
            const {img} = req.files
            let nameFile = uuid.v4() + ".jpeg"
            img.mv(path.resolve(__dirname, "..", "static", nameFile))

            const product = await Product.create({weight, size, idManufacturer, price, category, img: nameFile})
            return res.json(product)
        } catch (e) {
            next(ErrorApi.badRequest(e.message))
        }


    }

    async getAll(req, res){
        const result = await Product.findAll({
            attributes: [`idProduct`, `weight`, `size`, `idManufacturer`, `price`, `category`, `img`]
        })
        return res.json(result)
    }

    async getProduct (req, res){

    }

}
module.exports = new ProductController()