const multer = require("multer");

const upload = multer({
    storage: multer.diskStorage({
        destination: 'uploads/',
        filename(req, file, callback){
            const filename = `${file.originalname}`;

            return callback(null, filename);
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 2,
    },
});

module.exports = { upload };