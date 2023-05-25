class FileController {
    async upload(req, res) {
        const { filename } = req.file;

        if (!filename) {
            return res.status(400).json({ error: 'Nenhuma imagem foi enviada.' });
        }

        return res.status(200).json({ url: `uploads/${filename}` });
    }
}

module.exports = new FileController();