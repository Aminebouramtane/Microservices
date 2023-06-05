const Produit = require("../Models/produits.model");

const ProduitController = {
    index: async (req,res)=>{
        try {
            const produits = await Produit.find();
            res.json(produits);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getPrice: async (req, res) => {
        try {
          const { idP } = req.params;
          const produit = await Produit.findById(idP);
          if (produit) {
            res.json({ prixUnitaire: produit.prixUnitaire });
          } else {
            res.json(null);
          }
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
    
      ajouter: async (req, res) => {
        try {
          const {nom, marque, prixUnitaire } = req.body;
          const nouveauProduit = new Produit({
            nom,
            marque,
            prixUnitaire,
          });
          await nouveauProduit.save();
          res.json({ message: 'Produit ajouté avec succès' });
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
    
      supprimer: async (req, res) => {
        try {
          const { id } = req.params;
          await Produit.findByIdAndDelete(id);
          res.json({ message: 'Produit supprimé avec succès' });
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }, 
    
      modifierPrix: async (req, res) => {
        try {
          const { idP } = req.params;
          const { newPricing } = req.body;
          await Produit.findByIdAndUpdate(idP, { prixUnitaire: newPricing }, { new: true });
          res.json({ message: 'Prix du produit modifié avec succès' });
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },


}
module.exports = ProduitController;