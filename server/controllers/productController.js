const {Product, ProductStock} = require("../models/models")
const ErrorApi = require("../error/ErrorApi")
const uuid = require("uuid")
const path = require("path")
const {where} = require("sequelize");

class ProductController {
    async create(req, res, next){
        try{
            const {weight, size, idManufacturer, price, category, description, name, counts} = req.body
            const {file} = req.files
            let nameFile = uuid.v4() + ".jpeg"
            file.mv(path.resolve(__dirname, "..", "static", nameFile))

            const product = await Product.create({weight, size, idManufacturer, price, category, description, name, img: nameFile})
            const count = await ProductStock.create({idStock:1, idProduct: product.idProduct, availableProductCount:100})
            product[count] = count
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
                attributes: ["idProduct", "weight", "size", "idManufacturer", "price", "category", "img", "description", "name"],
                where: {category},
                limit,
                offset
            })
        } else {
            result = await Product.findAndCountAll({
                attributes: ["idProduct", "weight", "size", "idManufacturer", "price", "category", "img", "description", "name"],
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
                attributes: ["idProduct", "weight", "size", "idManufacturer", "price", "category", "img", "description", "name"],
                where: {idProduct:id},
            }
        )
        return res.json(result)
    }

}
module.exports = new ProductController()