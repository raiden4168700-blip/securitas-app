import mongoose from "mongoose";
const docSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Le nom que l'utilisateur donne
  file: {
    name: String,
    path: String,
    uploadedAt: Date,
  },
  uploadedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const AuditSse  = mongoose.model("AuditSse", docSchema); 
export default AuditSse;

