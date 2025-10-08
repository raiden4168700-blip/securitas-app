import mongoose from "mongoose";

const risqueChimiqueSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  site: { type: String, default: 'LAT NITROGEN' },
  dateFormation: { type: Date },
  dateFinValidite: { type: Date },
  niveau: { type: String, enum: ['N1', 'N2'] },

file: {
    name: String,
    path: String,
    uploadedAt: Date,
  },

}, { timestamps: true });

const RisqueChimique = mongoose.model("RisqueChimique", risqueChimiqueSchema);
export default RisqueChimique;
