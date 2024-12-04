const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();

// Configurar Multer para subir archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads')); // Guardar videos en /uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nombre único
  },
});
const upload = multer({ storage });

// Ruta para subir archivos
app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se subió ningún archivo');
  }
  const videoUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ videoUrl });
});

// Servir archivos estáticos (videos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app; // Exportar la app de Express en lugar de escuchar el puerto
