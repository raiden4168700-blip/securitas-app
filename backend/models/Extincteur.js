import mongoose from "mongoose";

const extincteurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  site: { type: String, default: 'LAT NITROGEN' },
  dateFormation: { type: Date },
  dateFinValidite: { type: Date },

file: {
    name: String,
    path: String,
    uploadedAt: Date,
  },

}, { timestamps: true });

const Extincteur = mongoose.model("Extincteur", extincteurSchema);
export default Extincteur;
