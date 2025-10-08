import express from 'express';

import Agent from '../models/Agent.js';
import Sst from '../models/Sst.js';
import Permis from '../models/Permis.js';
import VisiteMedicale from '../models/VisiteMedicale.js';
import CartePro from '../models/CartePro.js';
import FormationLocalRepli from '../models/FormationLocalRepli.js';
import RisqueChimique from '../models/RisqueChimique.js';
import Extincteur from '../models/Extincteur.js';
import MqfFenzyBioscape from '../models/MqfFenzyBioscape.js';
import SseCauseries from '../models/SseCauseries.js';
import AuditSse from '../models/AuditSse.js';
import ChainePti from '../models/ChainePti.js';
import EssaiMensuelPtiDati from '../models/EssaiMensuelPtiDati.js';

const router = express.Router();

// --- Objet pour accéder facilement aux modèles ---
const models = {
  agents: Agent,
  sst: Sst,
  permis: Permis,
  visiteMedicale: VisiteMedicale,
  cartePro: CartePro,
  formationLocalRepli: FormationLocalRepli,
  risqueChimique: RisqueChimique,
  extincteur: Extincteur,
  mqfFenzyBioscape: MqfFenzyBioscape,
  sseCauseries: SseCauseries,
  auditSse: AuditSse,
  chainePti: ChainePti,
  essaiMensuelPtiDati: EssaiMensuelPtiDati,
};

// --- ROUTE SPÉCIALE : GET /api/data/all ---
// Récupère toutes les données de toutes les collections en une seule fois
router.get('/all', async (req, res) => {
  try {
    const allData = {};
    for (const key in models) {
      allData[key] = await models[key].find({});
    }
    res.json(allData);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de toutes les données.', error: error.message });
  }
});

// --- ROUTES GÉNÉRIQUES pour chaque type de données ---

// GET /api/data/:type -> Récupérer une liste
router.get('/:type', async (req, res) => {
  const { type } = req.params;
  const model = models[type];
  if (!model) return res.status(404).json({ message: 'Type de donnée non trouvé.' });

  try {
    const items = await model.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: `Erreur serveur pour le type ${type}.`, error: error.message });
  }
});

// POST /api/data/:type -> Ajouter un élément (MODIFIÉ)
router.post('/:type', async (req, res) => {
  const { type } = req.params;
  const model = models[type];
  if (!model) return res.status(404).json({ message: 'Type de donnée non trouvé.' });

  try {
    const body = req.body;
// Dans backend/routes/dataRoutes.js, ajoutez cette nouvelle route après la route POST

// PUT /api/data/:type/:id -> Mettre à jour un élément
router.put('/:type/:id', async (req, res) => {
  const { type, id } = req.params;
  const model = models[type];
  if (!model) return res.status(404).json({ message: 'Type de donnée non trouvé.' });

  try {
    // On utilise { new: true } pour que la réponse contienne l'objet mis à jour
    const updatedItem = await model.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Élément non trouvé.' });
    }
    res.json(updatedItem);
  } catch (error) {
    console.error(`[dataRoutes.js] Erreur de mise à jour pour le type '${type}':`, error.message);
    res.status(400).json({ message: `Erreur de mise à jour pour le type ${type}.`, error: error.message });
  }
});


    // --- DÉBUT DE LA MODIFICATION ---
    // On s'assure que les champs de date sont de vrais objets Date avant la sauvegarde.
    // Cela évite les erreurs de "casting" si le format n'est pas parfait.
    if (body.dateFormation) {
      body.dateFormation = new Date(body.dateFormation);
    }
    if (body.dateFinValidite) {
      body.dateFinValidite = new Date(body.dateFinValidite);
    }
    if (body.dateObtention) {
      body.dateObtention = new Date(body.dateObtention);
    }
    // --- FIN DE LA MODIFICATION ---

    const newItem = new model(body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    // Ajout d'un console.error pour voir l'erreur détaillée dans le terminal du serveur
    console.error(`[dataRoutes.js] Erreur de sauvegarde pour le type '${type}':`, error.message);
    res.status(400).json({ message: `Erreur de validation pour le type ${type}.`, error: error.message });
  }
});

// DELETE /api/data/:type/:id -> Supprimer un élément
router.delete('/:type/:id', async (req, res) => {
  const { type, id } = req.params;
  const model = models[type];
  if (!model) return res.status(404).json({ message: 'Type de donnée non trouvé.' });

  try {
    const deletedItem = await model.findByIdAndDelete(id);
    if (!deletedItem) return res.status(404).json({ message: 'Élément non trouvé.' });
    res.json({ message: 'Élément supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: `Erreur serveur pour le type ${type}.`, error: error.message });
  }
});

export default router;
