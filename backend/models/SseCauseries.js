import mongoose from "mongoose";

// On utilise le même schéma simple que pour AuditSse
const docSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Le nom que l'utilisateur donne
  file: {
    name: String,
    path: String,
    uploadedAt: Date,
  },
  uploadedAt: { type: Date, default: Date.now },
}, { timestamps: true });

// La seule différence est le nom du modèle
const SseCauseries = mongoose.model("SseCauseries", docSchema); 

export default SseCauseries;
