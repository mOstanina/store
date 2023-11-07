const {Product} = require("../models/models")
const ErrorApi = require("../error/ErrorApi")
const uuid = require("uuid")
const path = require("path")
const {where} = require("sequelize");

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
        let {category, page} = req.query
        page = page || 1
        let limit = 6
        let offset = page * limit - limit
        let result

        if(category){
            result = await Product.findAndCountAll({
                attributes: ["idProduct", "weight", "size", "idManufacturer", "price", "category", "img", "description"],
                where: {category},
                limit,
                offset
            })
        } else {
            result = await Product.findAndCountAll({
                attributes: ["idProduct", "weight", "size", "idManufacturer", "price", "category", "img", "description"],
                limit,
                offset
            })
        }

        return res.json(result)
    }

    async getProduct (req, res){
        const {id} = req.params
        const result = await Product.findOne(

            {
                attributes: ["idProduct", "weight", "size", "idManufacturer", "price", "category", "img", "description"],
                where: {idProduct:id},
            }
        )
        return res.json(result)
    }

}
module.exports = new ProductController()