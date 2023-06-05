const express = require("express");
const route = express.Router();
const ProduitController = require("../Controllers/produits.controller");

route.get('/', ProduitController.index);
route.get('/:idP', ProduitController.getPrice);
route.post('/', ProduitController.ajouter);
route.delete('/:id', ProduitController.supprimer);
route.put('/:idP', ProduitController.modifierPrix);
// route.get('/amq/:idP',ProduitController.AMQResponse);

// route.get('/', (req, res) => {
//     res.send('Hello, world!');
//   });

module.exports=route ;