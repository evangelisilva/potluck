const mysql = require('mysql2');
const Config = require("./DBconfig")
const multer = require('multer');

const mysqlPool = mysql.createPool(Config);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + encodeURIComponent(file.originalname));
    },
});

const fileUpload = multer({
    storage: storage
})
module.exports = {
    mysqlPool,
    fileUpload
};