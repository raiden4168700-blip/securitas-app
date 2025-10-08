import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from 'path'; 
import { fileURLToPath } from 'url'; 

import authRoutes from "./routes/authRoutes.js";
import dataRoutes from "./routes/dataRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js"; 

dotenv.config();
const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads' )));

app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/upload", uploadRoutes); 

app.get("/", (req, res) => {
  res.send("🚀 API en ligne");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connecté à MongoDB");
    app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
  })
  .catch((err) => console.error("❌ Erreur MongoDB:", err));

