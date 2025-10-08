import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },     // Nom de l’onglet ou du tableau
    content: { type: String },                   // Texte ou infos diverses
    fileUrl: { type: String },                   // Si un fichier est attaché (PDF, image…)
    extra: { type: Object },                     // Données spécifiques (ex: { nom, prénom, site, validité })
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Data = mongoose.model("Data", dataSchema);

export default Data;
