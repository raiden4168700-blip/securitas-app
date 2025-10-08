import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// 1. Configuration de Multer
const storage = multer.diskStorage({
  // Destination où les fichiers seront sauvegardés
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Créez un dossier "uploads" à la racine de votre backend
  },
  // Comment nommer le fichier
  filename: (req, file, cb) => {
    // Crée un nom de fichier unique pour éviter les conflits
    // Ex: fichier-1726425101123.pdf
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtre pour n'accepter que les PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers PDF sont autorisés !'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// 2. Création de la route d'upload
// Elle attend un champ de formulaire nommé "file"
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'Veuillez joindre un fichier.' });
  }

  // Si l'upload réussit, le fichier est dans req.file
  // On renvoie le chemin d'accès au fichier pour le sauvegarder en base de données
  res.status(200).send({
    message: 'Fichier uploadé avec succès',
    // IMPORTANT : On renvoie un chemin relatif que le front-end pourra utiliser
    filePath: `/uploads/${req.file.filename}` 
  });
});

export default router;
