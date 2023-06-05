const express = require("express");
const route = express.Router();
const { Index, getPrice, Ajouter, ModifierPrix, Supprimer } = require("../Controllers/produits.controller");

route.get('/', Index);
route.get('/:idP', getPrice);
route.post('/ajouter', Ajouter);
route.delete('/:id',Supprimer);
route.put('/:idP', ModifierPrix);



module.exports=route ;