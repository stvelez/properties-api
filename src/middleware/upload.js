import multer from 'multer';

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, 'uploads/'); // Ruta donde se guardarán los archivos
    // },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Nombre de archivo original
    }
});

const upload = multer({ storage: storage });

export default upload.array('files', 10); // Exportamos la función upload.array
