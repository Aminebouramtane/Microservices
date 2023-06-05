const Commande = require('../Models/commandes.model');
const rabbitmq = require('../rabbitmq');

const commandeController = {
  index: async (req, res) => {
    try {
      const commandes = await Commande.find();
      res.json(commandes);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};

module.exports = commandeController;
