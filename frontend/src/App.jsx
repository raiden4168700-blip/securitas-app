// FICHIER COMPLET : App.jsx - PARTIE 1/4

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Users, FileText, Heart, Car, CreditCard, BarChart3, Plus, Minus, Home, FlaskConical, FireExtinguisher, Factory, File, Link, CalendarDays, Eye, Trash2, LogOut, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const initialSampleData = {
  agents: [],
  permis: [],
  sst: [],
  visiteMedicale: [],
  cartePro: [],
  formationLocalRepli: [],
  risqueChimique: [],
  extincteur: [],
  mqfFenzyBioscape: [],
  sseCauseries: [],
  auditSse: [],
  chainePti: [],
  essaiMensuelPtiDati: [],
};

// Fonctions utilitaires (votre code original, inchangé)
const calculateDaysRemaining = (dateFinValidite) => {
  if (!dateFinValidite) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endDate = new Date(dateFinValidite);
  endDate.setHours(0, 0, 0, 0);
  const diffTime = endDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const getStatusColor = (daysRemaining) => {
  if (daysRemaining <= 0) return 'bg-red-600 text-white';
  if (daysRemaining <= 30) return 'bg-red-500 text-white';
  if (daysRemaining <= 60) return 'bg-orange-500 text-white';
  return 'bg-green-500 text-white';
};

const formatDateForDisplay = (isoString) => {
    if (!isoString) return '-';
    try {
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return '-';
        return date.toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    } catch (error) {
        return '-';
    }
};


// Composant DataTable (votre code original, inchangé)
const DataTable = ({ data, type, onAdd, onDelete }) => {
  const [newEntry, setNewEntry] = useState({
    nom: '',
    prenom: '',
    site: 'LAT NITROGEN',
    dateFormation: '',
    dateFinValidite: '',
    dateObtention: '',
    valide: true,
    niveau: '',
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewEntry((prev) => ({ ...prev, file: file }));
  };

  const handleSelectChange = (value, name) => {
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (onAdd) {
      onAdd(newEntry, type);
      setNewEntry({ nom: '', prenom: '', site: 'LAT NITROGEN', dateFormation: '', dateFinValidite: '', dateObtention: '', valide: true, niveau: '', file: null });
      const fileInput = document.getElementById('fileInput');
      if (fileInput) fileInput.value = '';
    }
  };

 // Dans App.jsx, à l'intérieur du composant DataTable

  const handleViewFile = (file) => {
    // --- MODIFICATION ---
    
    // Cas 1: C'est un fichier déjà uploadé (notre objet personnalisé)
    if (file && file.path) {
      // On construit l'URL complète vers le backend
      const fileUrl = `https://securitas-app.onrender.com${file.path}`;
      window.open(fileUrl, '_blank' );
    } 
    // Cas 2: C'est un fichier local, pas encore uploadé (un vrai objet File)
    else if (file instanceof File) { 
        const url = URL.createObjectURL(file);
        window.open(url, '_blank');
    } 
    // Cas 3: Le fichier n'est pas valide
    else {
      console.error("Impossible de visualiser le fichier, format non reconnu:", file);
    }
  };


  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-6 rounded-lg border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Ajouter une nouvelle entrée</h3>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="grid gap-2"><Label htmlFor="nom" className="text-slate-700 font-medium">Nom</Label><Input id="nom" name="nom" value={newEntry.nom} onChange={handleInputChange} className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"/></div>
          <div className="grid gap-2"><Label htmlFor="prenom" className="text-slate-700 font-medium">Prénom</Label><Input id="prenom" name="prenom" value={newEntry.prenom} onChange={handleInputChange} className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"/></div>
          <div className="grid gap-2"><Label htmlFor="site" className="text-slate-700 font-medium">Site</Label><Input id="site" name="site" value="LAT NITROGEN" readOnly className="bg-slate-100 border-slate-300"/></div>
          {type === 'permis' ? (<>
              <div className="grid gap-2"><Label htmlFor="dateObtention" className="text-slate-700 font-medium">Date d'obtention</Label><Input id="dateObtention" name="dateObtention" type="date" value={newEntry.dateObtention} onChange={handleInputChange} className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"/></div>
              <div className="grid gap-2"><Label htmlFor="dateFinValidite" className="text-slate-700 font-medium">Date fin de validité</Label><Input id="dateFinValidite" name="dateFinValidite" type="date" value={newEntry.dateFinValidite} onChange={handleInputChange} className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"/></div>
          </>) : (<>
              <div className="grid gap-2"><Label htmlFor="dateFormation" className="text-slate-700 font-medium">Date de formation</Label><Input id="dateFormation" name="dateFormation" type="date" value={newEntry.dateFormation} onChange={handleInputChange} className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"/></div>
              <div className="grid gap-2"><Label htmlFor="dateFinValidite" className="text-slate-700 font-medium">Date fin validité</Label><Input id="dateFinValidite" name="dateFinValidite" type="date" value={newEntry.dateFinValidite} onChange={handleInputChange} className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"/></div>
          </>)}
          {type === 'permis' && (<div className="flex items-center space-x-2"><input type="checkbox" id="valide" name="valide" checked={newEntry.valide} onChange={handleInputChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"/><Label htmlFor="valide" className="text-slate-700 font-medium">Valide</Label></div>)}
          <div className="grid gap-2"><Label htmlFor="fileInput" className="text-slate-700 font-medium">Joindre un fichier (PDF)</Label><Input id="fileInput" name="fileInput" type="file" accept=".pdf" onChange={handleFileChange} className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"/></div>
          {type === 'risqueChimique' && (<div className="grid gap-2"><Label htmlFor="niveau" className="text-slate-700 font-medium">Niveau</Label><Select name="niveau" value={newEntry.niveau} onValueChange={(value) => handleSelectChange(value, 'niveau')}><SelectTrigger className="w-[180px] border-slate-300 focus:border-blue-500 focus:ring-blue-500"><SelectValue placeholder="Sélectionner niveau" /></SelectTrigger><SelectContent>
  <SelectItem 
    value="N1" 
    className="text-blue-600 font-medium hover:bg-blue-100 cursor-pointer"
  >
    N1
  </SelectItem>
  <SelectItem 
    value="N2" 
    className="text-blue-600 font-medium hover:bg-blue-100 cursor-pointer"
  >
    N2
  </SelectItem>
</SelectContent>
</Select></div>)}
          <Button type="button" onClick={handleAdd} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg transition-all duration-200"><Plus className="mr-2 h-4 w-4" /> Ajouter</Button>
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-slate-200">
        <table className="w-full border-collapse">
          <thead><tr className="bg-gradient-to-r from-slate-800 to-slate-900 text-white"><th className="border border-slate-300 p-4 text-left font-semibold">Nom</th><th className="border border-slate-300 p-4 text-left font-semibold">Prénom</th><th className="border border-slate-300 p-4 text-left font-semibold">LAT NITROGEN</th>{type === 'permis' ? (<>
                  <th className="border border-slate-300 p-4 text-left font-semibold">Date d'obtention</th><th className="border border-slate-300 p-4 text-left font-semibold">Date fin de validité</th><th className="border border-slate-300 p-4 text-left font-semibold">Jours restants</th><th className="border border-slate-300 p-4 text-left font-semibold">Statut</th>
          </>) : (<> 
                  <th className="border border-slate-300 p-4 text-left font-semibold">Date de formation</th><th className="border border-slate-300 p-4 text-left font-semibold">Date de fin de validité</th><th className="border border-slate-300 p-4 text-left font-semibold">Jours restants</th>
          </>)}{type === 'risqueChimique' && (<th className="border border-slate-300 p-4 text-left font-semibold">Niveau</th>)}<th className="border border-slate-300 p-4 text-left font-semibold">Fichier PDF</th><th className="border border-slate-300 p-4 text-left font-semibold">Actions</th></tr></thead>
          <tbody>{data.map((item, index) => {               
              const daysRemaining = item.dateFinValidite ? calculateDaysRemaining(item.dateFinValidite) : null;
              return (<tr key={item._id} className={`hover:bg-slate-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}`}>
                  <td className="border border-slate-300 p-4 text-slate-800">{item.nom}</td><td className="border border-slate-300 p-4 text-slate-800">{item.prenom}</td><td className="border border-slate-300 p-4 text-slate-800">LAT NITROGEN</td>
                  {type === 'permis' ? (<>
                      <td className="border border-slate-300 p-4 text-slate-800">{formatDateForDisplay(item.dateObtention)}</td>
                     <td className="border border-slate-300 p-4 text-slate-800">{formatDateForDisplay(item.dateFinValidite)}</td>

                      <td className="border border-slate-300 p-4">{daysRemaining !== null ? (<Badge className={getStatusColor(daysRemaining)}>{daysRemaining > 0 ? `${daysRemaining} jours` : daysRemaining === 0 ? 'Expire aujourd\'hui' : `Expiré depuis ${Math.abs(daysRemaining)} jours`}</Badge>) : (<span className="text-slate-400 text-sm">-</span>)}</td>
                      <td className="border border-slate-300 p-4"><Badge className={item.valide ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}>{item.valide ? 'Valide' : 'Non valide'}</Badge></td>
                  </>) : (<>
                      <td className="border border-slate-300 p-4 text-slate-800">{formatDateForDisplay(item.dateFormation)}</td>
                      <td className="border border-slate-300 p-4 text-slate-800">{formatDateForDisplay(item.dateFinValidite)}</td>
                      <td className="border border-slate-300 p-4">{daysRemaining !== null ? (<Badge className={getStatusColor(daysRemaining)}>{daysRemaining > 0 ? `${daysRemaining} jours` : daysRemaining === 0 ? 'Expire aujourd\'hui' : `Expiré depuis ${Math.abs(daysRemaining)} jours`}</Badge>) : (<span className="text-slate-400 text-sm">-</span>)}</td>
                  </>)}
                  {type === 'risqueChimique' && (<td className="border border-slate-300 p-4 text-slate-800">{item.niveau || '-'}</td>)}
                  <td className="border border-slate-300 p-4">{item.file ? (<div className="flex items-center gap-2"><Button onClick={() => handleViewFile(item.file)} variant="outline" size="sm" className="border-blue-300 text-blue-600 hover:bg-blue-50"><Eye className="h-4 w-4 mr-1" />Voir</Button><span className="text-sm text-slate-600 truncate max-w-[100px]" title={item.file.name}>{item.file.name}</span></div>) : (<span className="text-slate-400 text-sm">Aucun fichier</span>)}</td>
                  <td className="border border-slate-300 p-4"><Button 
  onClick={() => onDelete(item._id, type)} 
  size="sm" 
  style={{ backgroundColor: 'var(--destructive)', color: 'var(--destructive-foreground)' }}
>
  <Minus className="h-4 w-4" />
</Button>
</td>
                </tr>);
            })}</tbody>
        </table>
      </div>
    </div>
  );
};

// NOUVEAU : Composant générique pour l'upload de fichiers
const FileUploader = ({ onSave, id }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleSave = () => {
    if (selectedFile) {
      onSave(selectedFile, id);
      setSelectedFile(null);
      document.getElementById(`file-input-${id}`).value = '';
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-3 rounded-lg border border-slate-200">
      <Label htmlFor={`file-input-${id}`} className="text-slate-700 font-medium mb-2 block">Ajouter un fichier (PDF)</Label>
      <div className="flex items-center gap-4">
        <Input id={`file-input-${id}`} type="file" accept=".pdf" onChange={handleFileSelect} className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 flex-grow"/>
        {selectedFile && (
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
            <Save className="h-4 w-4 mr-2" />
            Enregistrer
          </Button>
        )}
      </div>
      {selectedFile && <p className="text-sm text-slate-600 mt-2">Prêt : {selectedFile.name}</p>}
    </div>
  );
};

// NOUVEAU : Composant générique pour afficher une liste de fichiers
const FileList = ({ files, onDelete }) => {
  

  const handleViewFile = (file) => {
    
    
    if (file && file.path) {
      const fileUrl = `https://securitas-app.onrender.com${file.path}`;
      window.open(fileUrl, '_blank' );
    } 
    else if (file instanceof File) { 
        const url = URL.createObjectURL(file);
        window.open(url, '_blank');
    } 
    else {
      console.error("Impossible de visualiser le fichier, format non reconnu:", file);
    }
  };


  const handleDeleteWithConfirmation = (fileIndex) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce fichier ?")) {
      onDelete(fileIndex);
    }
  };

  if (!files || files.length === 0) {
    return <p className="text-slate-500 text-sm text-center py-4 bg-slate-50 rounded border border-slate-200">Aucun fichier</p>;
  }

  return (
    <div className="space-y-2">
      {files.map((file, fileIndex) => (
        <div key={fileIndex} className="flex items-center justify-between p-2 border border-slate-200 rounded-md bg-slate-50">
          <div className="flex items-center gap-2">
            <File className="w-4 h-4 text-blue-600" />
            <span className="text-slate-800 text-sm truncate max-w-[120px]" title={file.name || 'fichier'}>{file.name || 'Fichier enregistré'}</span>
          </div>
          <div className="flex gap-1">
            <Button onClick={() => handleViewFile(file)} variant="outline" size="sm" className="border-blue-300 text-blue-600 hover:bg-blue-50 p-1"><Eye className="h-3 w-3" /></Button>
            <Button onClick={() => handleDeleteWithConfirmation(fileIndex)} variant="destructive" size="sm" className="bg-red-500 hover:bg-red-600 p-1"><Trash2 className="h-3 w-3" /></Button>
          </div>
        </div>
      ))}
    </div>
  );
};
// FICHIER COMPLET : App.jsx - PARTIE 2/4

// MODIFIÉ : Composant pour la gestion mensuelle (utilisé par SSE et Essai PTI)
const MonthlyFileManager = ({ title, data, onFileSave, onDeleteFile, headerColor }) => {
  const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('fr-FR', { month: 'long' }));

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {months.map((month, index) => {
          const monthId = index + 1;
          const monthData = data.find(item => item.monthId === monthId);
          const files = monthData ? monthData.files : [];

          return (
            <Card key={monthId} className="border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className={headerColor}>
                <CardTitle className="text-slate-800 capitalize">{month}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                <FileUploader onSave={onFileSave} id={monthId} />
                <FileList files={files} onDelete={(fileIndex) => onDeleteFile(monthId, fileIndex)} />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// MODIFIÉ : FileManager simple pour Audit et Chaîne PTI
const SimpleFileManager = ({ title, files, onFileSave, onDeleteFile }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">{title}</h2>
      <FileUploader onSave={onFileSave} id={title.replace(/\s+/g, '-')} />
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Fichiers enregistrés</h3>
        <FileList files={files} onDelete={onDeleteFile} />
      </div>
    </div>
  );
};

// Composant Dashboard (votre code original, inchangé)
const Dashboard = ({ data, onTabChange }) => {
  const totalAgents = data.agents.length;
  const getExpiringItems30 = (dataArray) => dataArray.filter(item => { if (item.dateFinValidite) { const daysRemaining = calculateDaysRemaining(item.dateFinValidite); return daysRemaining <= 30 && daysRemaining > 0; } return false; }).length;
  const getExpiringItems60 = (dataArray) => dataArray.filter(item => { if (item.dateFinValidite) { const daysRemaining = calculateDaysRemaining(item.dateFinValidite); return daysRemaining <= 60 && daysRemaining > 30; } return false; }).length;
  const getExpiredItems = (dataArray) => dataArray.filter(item => { if (item.dateFinValidite) { const daysRemaining = calculateDaysRemaining(item.dateFinValidite); return daysRemaining <= 0; } return false; }).length;
  const stats = {
    agents: { expiring30: getExpiringItems30(data.agents), expiring60: getExpiringItems60(data.agents), expired: getExpiredItems(data.agents) },
    sst: { expiring30: getExpiringItems30(data.sst), expiring60: getExpiringItems60(data.sst), expired: getExpiredItems(data.sst) },
    visiteMedicale: { expiring30: getExpiringItems30(data.visiteMedicale), expiring60: getExpiringItems60(data.visiteMedicale), expired: getExpiredItems(data.visiteMedicale) },
    cartePro: { expiring30: getExpiringItems30(data.cartePro), expiring60: getExpiringItems60(data.cartePro), expired: getExpiredItems(data.cartePro) },
    formationLocalRepli: { expiring30: getExpiringItems30(data.formationLocalRepli), expiring60: getExpiringItems60(data.formationLocalRepli), expired: getExpiredItems(data.formationLocalRepli) },
    risqueChimique: { expiring30: getExpiringItems30(data.risqueChimique), expiring60: getExpiringItems60(data.risqueChimique), expired: getExpiredItems(data.risqueChimique) },
    extincteur: { expiring30: getExpiringItems30(data.extincteur), expiring60: getExpiringItems60(data.extincteur), expired: getExpiredItems(data.extincteur) },
    mqfFenzyBioscape: { expiring30: getExpiringItems30(data.mqfFenzyBioscape), expiring60: getExpiringItems60(data.mqfFenzyBioscape), expired: getExpiredItems(data.mqfFenzyBioscape) },
    permis: { invalid: data.permis.filter(item => !item.valide).length, expiring30: getExpiringItems30(data.permis), expiring60: getExpiringItems60(data.permis), expired: getExpiredItems(data.permis) }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-slate-200 shadow-lg"><CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50"><CardTitle className="text-slate-800">Résumé Général</CardTitle></CardHeader><CardContent className="p-4"><div className="space-y-3">
          <div className="flex justify-between items-center"><span className="text-slate-700">Total Agents:</span><Badge className="bg-blue-600 text-white">{totalAgents}</Badge></div>
          <div className="flex justify-between items-center cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors" onClick={() => onTabChange('agents')}><span className="text-slate-700">Vidéo d'accueil sécurité</span><div className="flex gap-2"><Badge className="bg-red-500 text-white">{stats.agents.expiring30} (30j)</Badge><Badge className="bg-orange-500 text-white">{stats.agents.expiring60} (60j)</Badge><Badge className="bg-red-800 text-white">{stats.agents.expired} expirés</Badge></div></div>
          <div className="flex justify-between items-center cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors" onClick={() => onTabChange('sst')}><span className="text-slate-700">SST</span><div className="flex gap-2"><Badge className="bg-red-500 text-white">{stats.sst.expiring30} (30j)</Badge><Badge className="bg-orange-500 text-white">{stats.sst.expiring60} (60j)</Badge><Badge className="bg-red-800 text-white">{stats.sst.expired} expirés</Badge></div></div>
          <div className="flex justify-between items-center cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors" onClick={() => onTabChange('visiteMedicale')}><span className="text-slate-700">Visite Médicale</span><div className="flex gap-2"><Badge className="bg-red-500 text-white">{stats.visiteMedicale.expiring30} (30j)</Badge><Badge className="bg-orange-500 text-white">{stats.visiteMedicale.expiring60} (60j)</Badge><Badge className="bg-red-800 text-white">{stats.visiteMedicale.expired} expirés</Badge></div></div>
          <div className="flex justify-between items-center cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors" onClick={() => onTabChange('permis')}><span className="text-slate-700">Permis de Conduire</span><div className="flex gap-2"><Badge className="bg-red-500 text-white">{stats.permis.expiring30} (30j)</Badge><Badge className="bg-orange-500 text-white">{stats.permis.expiring60} (60j)</Badge><Badge className="bg-red-800 text-white">{stats.permis.expired} expirés</Badge><Badge className="bg-red-600 text-white">{stats.permis.invalid} non valides</Badge></div></div>
          <div className="flex justify-between items-center cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors" onClick={() => onTabChange('cartePro')}><span className="text-slate-700">Carte Professionnelle</span><div className="flex gap-2"><Badge className="bg-red-500 text-white">{stats.cartePro.expiring30} (30j)</Badge><Badge className="bg-orange-500 text-white">{stats.cartePro.expiring60} (60j)</Badge><Badge className="bg-red-800 text-white">{stats.cartePro.expired} expirés</Badge></div></div>
          <div className="flex justify-between items-center cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors" onClick={() => onTabChange('formationLocalRepli')}><span className="text-slate-700">Formation Local de Repli</span><div className="flex gap-2"><Badge className="bg-red-500 text-white">{stats.formationLocalRepli.expiring30} (30j)</Badge><Badge className="bg-orange-500 text-white">{stats.formationLocalRepli.expiring60} (60j)</Badge><Badge className="bg-red-800 text-white">{stats.formationLocalRepli.expired} expirés</Badge></div></div>
          <div className="flex justify-between items-center cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors" onClick={() => onTabChange('risqueChimique')}><span className="text-slate-700">Risque Chimique</span><div className="flex gap-2"><Badge className="bg-red-500 text-white">{stats.risqueChimique.expiring30} (30j)</Badge><Badge className="bg-orange-500 text-white">{stats.risqueChimique.expiring60} (60j)</Badge><Badge className="bg-red-800 text-white">{stats.risqueChimique.expired} expirés</Badge></div></div>
          <div className="flex justify-between items-center cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors" onClick={() => onTabChange('extincteur')}><span className="text-slate-700">Extincteur</span><div className="flex gap-2"><Badge className="bg-red-500 text-white">{stats.extincteur.expiring30} (30j)</Badge><Badge className="bg-orange-500 text-white">{stats.extincteur.expiring60} (60j)</Badge><Badge className="bg-red-800 text-white">{stats.extincteur.expired} expirés</Badge></div></div>
          <div className="flex justify-between items-center cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors" onClick={() => onTabChange('mqfFenzyBioscape')}><span className="text-slate-700">MQF/FENZY Bioscape</span><div className="flex gap-2"><Badge className="bg-red-500 text-white">{stats.mqfFenzyBioscape.expiring30} (30j)</Badge><Badge className="bg-orange-500 text-white">{stats.mqfFenzyBioscape.expiring60} (60j)</Badge><Badge className="bg-red-800 text-white">{stats.mqfFenzyBioscape.expired} expirés</Badge></div></div>
        </div></CardContent></Card>
        <Card className="border-slate-200 shadow-lg"><CardHeader className="bg-gradient-to-r from-red-50 to-orange-50"><CardTitle className="text-slate-800">Alertes Urgentes</CardTitle></CardHeader><CardContent className="p-4"><div className="space-y-3">
          {stats.agents.expired > 0 && (<div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 cursor-pointer hover:bg-red-50 rounded transition-colors" onClick={() => onTabChange('agents')}><strong>Urgent:</strong> {stats.agents.expired} vidéo d'accueil sécurité expirée</div>)}
          {stats.sst.expired > 0 && (<div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 cursor-pointer hover:bg-red-50 rounded transition-colors" onClick={() => onTabChange('sst')}><strong>Urgent:</strong> {stats.sst.expired} formation SST expirée</div>)}
          {stats.visiteMedicale.expired > 0 && (<div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 cursor-pointer hover:bg-red-50 rounded transition-colors" onClick={() => onTabChange('visiteMedicale')}><strong>Urgent:</strong> {stats.visiteMedicale.expired} visite médicale expirée</div>)}
          {stats.permis.expired > 0 && (<div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 cursor-pointer hover:bg-red-50 rounded transition-colors" onClick={() => onTabChange('permis')}><strong>Urgent:</strong> {stats.permis.expired} permis de conduire expiré</div>)}
          {stats.cartePro.expired > 0 && (<div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 cursor-pointer hover:bg-red-50 rounded transition-colors" onClick={() => onTabChange('cartePro')}><strong>Urgent:</strong> {stats.cartePro.expired} carte professionnelle expirée</div>)}
          {stats.formationLocalRepli.expired > 0 && (<div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 cursor-pointer hover:bg-red-50 rounded transition-colors" onClick={() => onTabChange('formationLocalRepli')}><strong>Urgent:</strong> {stats.formationLocalRepli.expired} formation local de repli expirée</div>)}
          {stats.risqueChimique.expired > 0 && (<div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 cursor-pointer hover:bg-red-50 rounded transition-colors" onClick={() => onTabChange('risqueChimique')}><strong>Urgent:</strong> {stats.risqueChimique.expired} formation risque chimique expirée</div>)}
          {stats.extincteur.expired > 0 && (<div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 cursor-pointer hover:bg-red-50 rounded transition-colors" onClick={() => onTabChange('extincteur')}><strong>Urgent:</strong> {stats.extincteur.expired} vérification extincteur expirée</div>)}
          {stats.mqfFenzyBioscape.expired > 0 && (<div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 cursor-pointer hover:bg-red-50 rounded transition-colors" onClick={() => onTabChange('mqfFenzyBioscape')}><strong>Urgent:</strong> {stats.mqfFenzyBioscape.expired} vérification MQF/FENZY Bioscape expirée</div>)}
          {stats.permis.invalid > 0 && (<div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 cursor-pointer hover:bg-red-50 rounded transition-colors" onClick={() => onTabChange('permis')}><strong>Attention:</strong> {stats.permis.invalid} permis de conduire non valide</div>)}
          {stats.agents.expiring30 > 0 && (<div className="p-3 bg-red-50 border-l-4 border-red-400 text-red-600 cursor-pointer hover:bg-red-25 rounded transition-colors" onClick={() => onTabChange('agents')}><strong>Attention:</strong> {stats.agents.expiring30} vidéo d'accueil sécurité expire dans 30 jours</div>)}
          {stats.sst.expiring30 > 0 && (<div className="p-3 bg-red-50 border-l-4 border-red-400 text-red-600 cursor-pointer hover:bg-red-25 rounded transition-colors" onClick={() => onTabChange('sst')}><strong>Attention:</strong> {stats.sst.expiring30} formation SST expire dans 30 jours</div>)}
          {stats.visiteMedicale.expiring30 > 0 && (<div className="p-3 bg-red-50 border-l-4 border-red-400 text-red-600 cursor-pointer hover:bg-red-25 rounded transition-colors" onClick={() => onTabChange('visiteMedicale')}><strong>Attention:</strong> {stats.visiteMedicale.expiring30} visite médicale expire dans 30 jours</div>)}
          {stats.permis.expiring30 > 0 && (<div className="p-3 bg-red-50 border-l-4 border-red-400 text-red-600 cursor-pointer hover:bg-red-25 rounded transition-colors" onClick={() => onTabChange('permis')}><strong>Attention:</strong> {stats.permis.expiring30} permis de conduire expire dans 30 jours</div>)}
          {stats.cartePro.expiring30 > 0 && (<div className="p-3 bg-red-50 border-l-4 border-red-400 text-red-600 cursor-pointer hover:bg-red-25 rounded transition-colors" onClick={() => onTabChange('cartePro')}><strong>Attention:</strong> {stats.cartePro.expiring30} carte professionnelle expire dans 30 jours</div>)}
          {stats.formationLocalRepli.expiring30 > 0 && (<div className="p-3 bg-red-50 border-l-4 border-red-400 text-red-600 cursor-pointer hover:bg-red-25 rounded transition-colors" onClick={() => onTabChange('formationLocalRepli')}><strong>Attention:</strong> {stats.formationLocalRepli.expiring30} formation local de repli expire dans 30 jours</div>)}
          {stats.risqueChimique.expiring30 > 0 && (<div className="p-3 bg-red-50 border-l-4 border-red-400 text-red-600 cursor-pointer hover:bg-red-25 rounded transition-colors" onClick={() => onTabChange('risqueChimique')}><strong>Attention:</strong> {stats.risqueChimique.expiring30} formation risque chimique expire dans 30 jours</div>)}
          {stats.extincteur.expiring30 > 0 && (<div className="p-3 bg-red-50 border-l-4 border-red-400 text-red-600 cursor-pointer hover:bg-red-25 rounded transition-colors" onClick={() => onTabChange('extincteur')}><strong>Attention:</strong> {stats.extincteur.expiring30} vérification extincteur expire dans 30 jours</div>)}
          {stats.mqfFenzyBioscape.expiring30 > 0 && (<div className="p-3 bg-red-50 border-l-4 border-red-400 text-red-600 cursor-pointer hover:bg-red-25 rounded transition-colors" onClick={() => onTabChange('mqfFenzyBioscape')}><strong>Attention:</strong> {stats.mqfFenzyBioscape.expiring30} vérification MQF/FENZY Bioscape expire dans 30 jours</div>)}
          {stats.agents.expiring60 > 0 && (<div className="p-3 bg-orange-50 border-l-4 border-orange-400 text-orange-600 cursor-pointer hover:bg-orange-25 rounded transition-colors" onClick={() => onTabChange('agents')}><strong>Info:</strong> {stats.agents.expiring60} vidéo d'accueil sécurité expire dans 60 jours</div>)}
          {stats.sst.expiring60 > 0 && (<div className="p-3 bg-orange-50 border-l-4 border-orange-400 text-orange-600 cursor-pointer hover:bg-orange-25 rounded transition-colors" onClick={() => onTabChange('sst')}><strong>Info:</strong> {stats.sst.expiring60} formation SST expire dans 60 jours</div>)}
          {stats.visiteMedicale.expiring60 > 0 && (<div className="p-3 bg-orange-50 border-l-4 border-orange-400 text-orange-600 cursor-pointer hover:bg-orange-25 rounded transition-colors" onClick={() => onTabChange('visiteMedicale')}><strong>Info:</strong> {stats.visiteMedicale.expiring60} visite médicale expire dans 60 jours</div>)}
          {stats.permis.expiring60 > 0 && (<div className="p-3 bg-orange-50 border-l-4 border-orange-400 text-orange-600 cursor-pointer hover:bg-orange-25 rounded transition-colors" onClick={() => onTabChange('permis')}><strong>Info:</strong> {stats.permis.expiring60} permis de conduire expire dans 60 jours</div>)}
          {stats.cartePro.expiring60 > 0 && (<div className="p-3 bg-orange-50 border-l-4 border-orange-400 text-orange-600 cursor-pointer hover:bg-orange-25 rounded transition-colors" onClick={() => onTabChange('cartePro')}><strong>Info:</strong> {stats.cartePro.expiring60} carte professionnelle expire dans 60 jours</div>)}
          {stats.formationLocalRepli.expiring60 > 0 && (<div className="p-3 bg-orange-50 border-l-4 border-orange-400 text-orange-600 cursor-pointer hover:bg-orange-25 rounded transition-colors" onClick={() => onTabChange('formationLocalRepli')}><strong>Info:</strong> {stats.formationLocalRepli.expiring60} formation local de repli expire dans 60 jours</div>)}
          {stats.risqueChimique.expiring60 > 0 && (<div className="p-3 bg-orange-50 border-l-4 border-orange-400 text-orange-600 cursor-pointer hover:bg-orange-25 rounded transition-colors" onClick={() => onTabChange('risqueChimique')}><strong>Info:</strong> {stats.risqueChimique.expiring60} formation risque chimique expire dans 60 jours</div>)}
          {stats.extincteur.expiring60 > 0 && (<div className="p-3 bg-orange-50 border-l-4 border-orange-400 text-orange-600 cursor-pointer hover:bg-orange-25 rounded transition-colors" onClick={() => onTabChange('extincteur')}><strong>Info:</strong> {stats.extincteur.expiring60} vérification extincteur expire dans 60 jours</div>)}
          {stats.mqfFenzyBioscape.expiring60 > 0 && (<div className="p-3 bg-orange-50 border-l-4 border-orange-400 text-orange-600 cursor-pointer hover:bg-orange-25 rounded transition-colors" onClick={() => onTabChange('mqfFenzyBioscape')}><strong>Info:</strong> {stats.mqfFenzyBioscape.expiring60} vérification MQF/FENZY Bioscape expire dans 60 jours</div>)}
          {(stats.agents.expiring30 + stats.sst.expiring30 + stats.visiteMedicale.expiring30 + stats.permis.expiring30 + stats.cartePro.expiring30 + stats.formationLocalRepli.expiring30 + stats.risqueChimique.expiring30 + stats.extincteur.expiring30 + stats.mqfFenzyBioscape.expiring30 + stats.agents.expiring60 + stats.sst.expiring60 + stats.visiteMedicale.expiring60 + stats.permis.expiring60 + stats.cartePro.expiring60 + stats.formationLocalRepli.expiring60 + stats.risqueChimique.expiring60 + stats.extincteur.expiring60 + stats.mqfFenzyBioscape.expiring60) === 0 && (stats.agents.expired + stats.sst.expired + stats.visiteMedicale.expired + stats.permis.expired + stats.cartePro.expired + stats.formationLocalRepli.expired + stats.risqueChimique.expired + stats.extincteur.expired + stats.mqfFenzyBioscape.expired) === 0 && stats.permis.invalid === 0 && (
            <div className="p-3 bg-emerald-100 border-l-4 border-emerald-500 text-emerald-700 rounded"><strong>Excellent:</strong> Tous les documents sont à jour !</div>
          )}
        </div></CardContent></Card>
      </div>
    </div>
  );
};

const DocumentTable = ({ data, type, onAdd, onDelete, title }) => {
  const [newEntry, setNewEntry] = useState({ name: '', file: null });
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setNewEntry(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setNewEntry(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleAdd = () => {
    if (onAdd && (newEntry.name || newEntry.file)) {
      onAdd(newEntry, type);
      setNewEntry({ name: '', file: null });
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleViewFile = (file) => {
    if (file && typeof file.path === 'string') {
      window.open(`https://securitas-app.onrender.com${file.path}`, '_blank' );
    } else {
      console.error("Format de fichier non reconnu:", file);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">{title}</h2>
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-6 rounded-lg border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Ajouter un nouveau document</h3>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="grid gap-2 flex-grow">
            <Label htmlFor={`name-${type}`}>Nom du document</Label>
            <Input id={`name-${type}`} name="name" value={newEntry.name} onChange={handleInputChange} placeholder="Ex: Rapport Mensuel Janvier" />
          </div>
          <div className="grid gap-2 flex-grow">
            <Label htmlFor={`file-${type}`}>Fichier (PDF)</Label>
            <Input ref={inputRef} id={`file-${type}`} name="file" type="file" accept=".pdf" onChange={handleFileChange} />
          </div>
          <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />Enregistrer
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-slate-200">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
            <tr>
              <th className="p-3 text-left">Nom du Document</th>
              <th className="p-3 text-left">Date d'ajout</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(!data || data.length === 0) ? (
              <tr><td colSpan="3" className="p-4 text-center text-slate-500">Aucun document.</td></tr>
            ) : (
              data.map((item) => (
                <tr key={item._id} className="border-b hover:bg-slate-50">
                  <td className="p-3 font-medium">{item.name}</td>
                  <td className="p-3">{formatDateForDisplay(item.uploadedAt)}</td>
                  <td className="p-3 flex gap-2">
                    <Button onClick={() => handleViewFile(item.file)} variant="outline" size="sm"><Eye className="h-4 w-4 mr-1" />Voir</Button>
                    <Button 
  onClick={() => onDelete(item._id, type)} 
  size="sm" 
  style={{ backgroundColor: 'var(--destructive)', color: 'var(--destructive-foreground)' }}
>
  <Trash2 className="h-4 w-4" />
</Button>

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


// FICHIER COMPLET : App.jsx - PARTIE 3/4

function App() {
  const [data, setData] = useState(initialSampleData);
  
  // MODIFIÉ : Deux états pour gérer les onglets séparément
  const [mainTab, setMainTab] = useState('dashboard');
  const [docTab, setDocTab] = useState('');
 const navigate = useNavigate();
 const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // NOUVEAU : Logique de déconnexion
  const handleLogout = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      localStorage.removeItem('token');
      window.location.reload(); // La manière la plus simple de rediriger vers la page de connexion
    }
  };

  // MODIFIÉ : Fonctions séparées pour changer les onglets
  const handleMainTabChange = (tabValue) => {
    setDocTab(''); // Désactive l'onglet de document
    setMainTab(tabValue);
  };

  const handleDocTabChange = (tabValue) => {
    setMainTab(''); // Désactive l'onglet principal
    setDocTab(tabValue);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/auth');
          return;
        }

        const response = await fetch('https://securitas-app.onrender.com/api/data/all', {
          headers: { 'Authorization': `Bearer ${token}` },
        } );

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('token');
            navigate('/auth');
            return;
          }
          throw new Error('Erreur réseau lors de la récupération des données.');
        }





        const allDataFromDb = await response.json();
        
        const sanitizedData = {
          agents: allDataFromDb.agents || [],
          permis: allDataFromDb.permis || [],
          sst: allDataFromDb.sst || [],
          visiteMedicale: allDataFromDb.visiteMedicale || [],
          cartePro: allDataFromDb.cartePro || [],
          formationLocalRepli: allDataFromDb.formationLocalRepli || [],
          risqueChimique: allDataFromDb.risqueChimique || [],
          extincteur: allDataFromDb.extincteur || [],
          mqfFenzyBioscape: allDataFromDb.mqfFenzyBioscape || [],
          sseCauseries: allDataFromDb.sseCauseries || [],
          auditSse: allDataFromDb.auditSse || [],
          chainePti: allDataFromDb.chainePti || [],
          essaiMensuelPtiDati: allDataFromDb.essaiMensuelPtiDati || [],
        };

        setData(sanitizedData);

      } catch (err) {
        console.error("Erreur lors du chargement des données :", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);


  // Dans App.jsx, remplacez votre fonction handleAddEntry par celle-ci

 // Dans App.jsx

     const handleAddEntry = async (newEntry, type) => {
    try {
      const token = localStorage.getItem('token');
      let entryData = { ...newEntry };

      if (newEntry.file && typeof newEntry.file.size === 'number') {
        const formData = new FormData();
        formData.append('file', newEntry.file);
        const uploadResponse = await fetch('https://securitas-app.onrender.com/api/upload', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: formData } );
        if (!uploadResponse.ok) throw new Error(`Upload échoué: ${await uploadResponse.text()}`);
        const uploadResult = await uploadResponse.json();
        entryData.file = { name: newEntry.name || newEntry.file.name, path: uploadResult.filePath, uploadedAt: new Date().toISOString() };
      } else {
        delete entryData.file;
      }

      const response = await fetch(`https://securitas-app.onrender.com/api/data/${type}`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(entryData ) });
      if (!response.ok) throw new Error(`Erreur serveur: ${await response.text()}`);
      
      const addedItemFromServer = await response.json();
      
      setData(prev => ({ ...prev, [type]: [...(prev[type] || []), addedItemFromServer] }));

    } catch (err) {
      console.error(`Erreur dans handleAddEntry pour ${type}:`, err);
      setError(err.message);
    }
  };

  const handleDeleteEntry = async (id, type) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://securitas-app.onrender.com/api/data/${type}/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } } );
      if (!response.ok) throw new Error('Erreur lors de la suppression sur le serveur.');
      
      setData(prev => ({ ...prev, [type]: prev[type].filter(item => item._id !== id) }));
    } catch (err) {
      console.error(`Erreur dans handleDeleteEntry pour ${type}:`, err);
      setError(err.message);
    }
  };


  // NOUVEAU : Logique pour sauvegarder les fichiers (à connecter au backend plus tard)
  // Dans App.jsx

  // ... (autres fonctions)

  // MODIFIÉ : Logique pour sauvegarder les fichiers en les envoyant au backend
  const handleFileSave = async (file, type, id) => {
    console.log(`Envoi du fichier pour ${type}, ID: ${id}`, file);
    
    const formData = new FormData();
    formData.append('file', file); // 'file' doit correspondre au nom attendu par multer

    try {
      const token = localStorage.getItem('token');

      // 1. Envoyer le fichier au backend
      const uploadResponse = await fetch('https://securitas-app.onrender.com/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // PAS de 'Content-Type', le navigateur le définit automatiquement pour FormData
        },
        body: formData,
      } );

      if (!uploadResponse.ok) {
        throw new Error("L'upload du fichier a échoué.");
      }

      const uploadResult = await uploadResponse.json();
      const { filePath } = uploadResult; // Récupère le chemin du fichier sauvegardé

      // 2. Mettre à jour l'état local avec le chemin du fichier (et non plus l'objet Fichier)
      // C'est ce qui sera sauvegardé en base de données plus tard
      const fileData = {
        name: file.name,
        path: filePath, // On stocke le chemin retourné par le serveur
        uploadedAt: new Date().toISOString(),
      };

      // Pour les types mensuels (SSE, PTI)
      if (type === 'sseCauseries' || type === 'essaiMensuelPtiDati') {
        setData(prevData => {
          const updatedData = { ...prevData };
          const targetArray = updatedData[type] || [];
          let itemIndex = targetArray.findIndex(item => item.monthId === id);

          if (itemIndex > -1) {
            const updatedItem = { ...targetArray[itemIndex] };
            updatedItem.files = [...(updatedItem.files || []), fileData];
            updatedData[type] = [...targetArray.slice(0, itemIndex), updatedItem, ...targetArray.slice(itemIndex + 1)];
          } else {
            updatedData[type] = [...targetArray, { monthId: id, files: [fileData] }];
          }
          
          return updatedData;
        });
      } else { // Pour les types simples (Audit, Chaîne PTI)
        setData(prevData => ({
          ...prevData,
          [type]: [...(prevData[type] || []), fileData]
        }));
      }

    } catch (err) {
      console.error("Erreur lors de l'upload:", err);
      setError(err.message);
    }
  };

  // ... (reste du composant App)


  // NOUVEAU : Logique pour supprimer les fichiers
  const handleDeleteFile = (id, fileIndex, type) => {
    console.log(`Suppression du fichier pour ${type}, ID: ${id}, Index: ${fileIndex}`);
    
    if (type === 'sseCauseries' || type === 'essaiMensuelPtiDati') {
      setData(prevData => {
        const updatedData = { ...prevData };
        const targetArray = updatedData[type];
        const itemIndex = targetArray.findIndex(item => item.monthId === id);

        if (itemIndex > -1) {
          const updatedItem = { ...targetArray[itemIndex] };
          updatedItem.files = updatedItem.files.filter((_, index) => index !== fileIndex);
          updatedData[type] = [...targetArray.slice(0, itemIndex), updatedItem, ...targetArray.slice(itemIndex + 1)];
        }

        return updatedData;
      });
    } else { // Pour Audit et Chaîne PTI, l'ID est l'index du fichier
      setData(prevData => ({
        ...prevData,
        [type]: prevData[type].filter((_, index) => index !== id)
      }));
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen text-2xl font-bold text-slate-600">Chargement des données...</div>;
  }
  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-2xl font-bold text-red-600">Erreur: {error}</div>;
  }
// FICHIER COMPLET : App.jsx - PARTIE 4/4

    return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <header className="bg-slate-900 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">SECURITAS</h1>
            <p className="text-slate-300">Système de Gestion des Agents</p>
          </div>
          <Button onClick={handleLogout} className="logout-button"><LogOut className="mr-2 h-4 w-4" />Déconnexion</Button>
        </div>
      </header>

      <div className="flex flex-1" style={{ height: 'calc(100vh - 92px)' }}>
       <aside className="w-72 bg-white shadow-md flex-shrink-0 p-4">
  <h2 className="text-xl font-semibold text-slate-800 mb-4">Navigation</h2>
  <nav className="space-y-2">
    <Button 
      onClick={() => setMainTab('dashboard')} 
      variant="ghost" 
      className="w-full justify-start main-nav-button"
      data-active={mainTab === 'dashboard'}
    >
      <BarChart3 className="mr-2 h-4 w-4" />Tableau de Bord
    </Button>
    <Button 
      onClick={() => setMainTab('documents')} 
      variant="ghost" 
      className="w-full justify-start main-nav-button"
      data-active={mainTab === 'documents'}
    >
      <FileText className="mr-2 h-4 w-4" />Gestion Documents
    </Button>
  </nav>
</aside>


        <main className="flex-1 p-6 overflow-y-auto">
          {mainTab === 'dashboard' && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="overflow-x-auto pb-2"><TabsList>
                  <TabsList>
  <TabsList>
  <TabsList>
  <TabsTrigger value="dashboard" style={activeTab === 'dashboard' ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' } : {}}>Tableau de Bord</TabsTrigger>
  <TabsTrigger value="agents" style={activeTab === 'agents' ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' } : {}}>Vidéo sécurité</TabsTrigger>
  <TabsTrigger value="permis" style={activeTab === 'permis' ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' } : {}}>Permis</TabsTrigger>
  <TabsTrigger value="sst" style={activeTab === 'sst' ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' } : {}}>SST</TabsTrigger>
  <TabsTrigger value="visiteMedicale" style={activeTab === 'visiteMedicale' ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' } : {}}>Visite Médicale</TabsTrigger>
  <TabsTrigger value="cartePro" style={activeTab === 'cartePro' ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' } : {}}>Carte Pro</TabsTrigger>
  <TabsTrigger value="formationLocalRepli" style={activeTab === 'formationLocalRepli' ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' } : {}}>Formation Repli</TabsTrigger>
  <TabsTrigger value="risqueChimique" style={activeTab === 'risqueChimique' ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' } : {}}>Risque Chimique</TabsTrigger>
  <TabsTrigger value="extincteur" style={activeTab === 'extincteur' ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' } : {}}>Extincteur</TabsTrigger>
  <TabsTrigger value="mqfFenzyBioscape" style={activeTab === 'mqfFenzyBioscape' ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' } : {}}>MQF/FENZY</TabsTrigger>
</TabsList>

</TabsList>

</TabsList>

              </TabsList></div>
              <div className="mt-4">
                <TabsContent value="dashboard"><Dashboard data={data} onTabChange={setActiveTab} /></TabsContent>
                <TabsContent value="agents"><DataTable data={data.agents} type="agents" onAdd={handleAddEntry} onDelete={handleDeleteEntry} /></TabsContent>
                <TabsContent value="permis"><DataTable data={data.permis} type="permis" onAdd={handleAddEntry} onDelete={handleDeleteEntry} /></TabsContent>
                <TabsContent value="sst"><DataTable data={data.sst} type="sst" onAdd={handleAddEntry} onDelete={handleDeleteEntry} /></TabsContent>
                <TabsContent value="visiteMedicale"><DataTable data={data.visiteMedicale} type="visiteMedicale" onAdd={handleAddEntry} onDelete={handleDeleteEntry} /></TabsContent>
                <TabsContent value="cartePro"><DataTable data={data.cartePro} type="cartePro" onAdd={handleAddEntry} onDelete={handleDeleteEntry} /></TabsContent>
                <TabsContent value="formationLocalRepli"><DataTable data={data.formationLocalRepli} type="formationLocalRepli" onAdd={handleAddEntry} onDelete={handleDeleteEntry} /></TabsContent>
                <TabsContent value="risqueChimique"><DataTable data={data.risqueChimique} type="risqueChimique" onAdd={handleAddEntry} onDelete={handleDeleteEntry} /></TabsContent>
                <TabsContent value="extincteur"><DataTable data={data.extincteur} type="extincteur" onAdd={handleAddEntry} onDelete={handleDeleteEntry} /></TabsContent>
                <TabsContent value="mqfFenzyBioscape"><DataTable data={data.mqfFenzyBioscape} type="mqfFenzyBioscape" onAdd={handleAddEntry} onDelete={handleDeleteEntry} /></TabsContent>
              </div>
            </Tabs>
          )}

          {mainTab === 'documents' && (
            <Tabs value={docTab} onValueChange={setDocTab} className="w-full">
              <div className="overflow-x-auto pb-2"><TabsList>
                 <TabsList>
  <TabsList>
  <TabsList>
  <TabsTrigger value="sseCauseries" style={docTab === 'sseCauseries' ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' } : {}}>CAUSERIES SSE</TabsTrigger>
  <TabsTrigger value="auditSse" style={docTab === 'auditSse' ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' } : {}}>Audit SSE</TabsTrigger>
  <TabsTrigger value="chainePti" style={docTab === 'chainePti' ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' } : {}}>Chaîne PTI</TabsTrigger>
  <TabsTrigger value="essaiMensuelPtiDati" style={docTab === 'essaiMensuelPtiDati' ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' } : {}}>Essai Mensuel PTI/DATI</TabsTrigger>
</TabsList>

</TabsList>

</TabsList>

              </TabsList></div>
              <div className="mt-4">
                <TabsContent value="sseCauseries"><DocumentTable title="Causeries SSE" data={data.sseCauseries} type="sseCauseries" onAdd={handleAddEntry} onDelete={handleDeleteEntry} /></TabsContent>
                <TabsContent value="auditSse"><DocumentTable title="Audit SSE" data={data.auditSse} type="auditSse" onAdd={handleAddEntry} onDelete={handleDeleteEntry} /></TabsContent>
                <TabsContent value="chainePti"><DocumentTable title="Chaîne PTI" data={data.chainePti} type="chainePti" onAdd={handleAddEntry} onDelete={handleDeleteEntry} /></TabsContent>
                <TabsContent value="essaiMensuelPtiDati"><DocumentTable title="Essai Mensuel PTI/DATI" data={data.essaiMensuelPtiDati} type="essaiMensuelPtiDati" onAdd={handleAddEntry} onDelete={handleDeleteEntry} /></TabsContent>
              </div>
            </Tabs>
          )}
        </main>
      </div>
    </div>
  );
}


export default App;