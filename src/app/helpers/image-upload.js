const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "user";
    } else if (req.baseUrl.includes("tickets")) {
      folder = "tickets";
    }

    cb(null, `src/public/images/${folder}`); // Pasta onde os arquivos serão armazenados
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${Date.now()}.${extension}`); // Nome do arquivo
  },
});

// Filtro de tipos de arquivo permitidos (opcional)
const filterFiles = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error("Somente imagens são permitidas."));
  }
  cb(null, true);
};

const imageUpload = multer({ storage: storage, fileFilter: filterFiles });

module.exports = { imageUpload };
