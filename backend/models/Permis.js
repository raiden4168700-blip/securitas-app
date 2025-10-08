// backend/models/Permis.js (Version Corrigée)
import mongoose from "mongoose";

const permisSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  dateObtention: { type: Date },
  dateFinValidite: { type: Date },
  valide: { type: Boolean, default: true },
  
  // --- AJOUTEZ CE BLOC ---
  file: {
    name: String,
    path: String,
    uploadedAt: Date,
  },
  // -----------------------

}, { timestamps: true });

const Permis = mongoose.model("Permis", permisSchema);
export default Permis;
