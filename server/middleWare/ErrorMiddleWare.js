const ErrorApi = require("../error/ErrorApi")

module.exports = function (error, req, res, next) {
    if(error instanceof ErrorApi){
        return res.status(error.status).json({message:error.message})
    }

    return res.status(500).json({message: "Error"})
}