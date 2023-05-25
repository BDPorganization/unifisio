const multer = require("multer");
const { v4 } = require("uuid");

const upload = multer({
    storage: multer.diskStorage({
        destination: 'uploads/',
        filename(req, file, callback){
            const filename = `${file.originalname}`;

            return callback(null, filename);
        }
    }),
});

module.exports = { upload };