const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  _id: Number,
  date: { type: Date, default: Date.now },
  produits: [String],
  prixTotal: Number,
});

const Commande = mongoose.model('commandes', commandeSchema);

module.exports = Commande;
