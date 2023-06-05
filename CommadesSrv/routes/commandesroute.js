const express = require('express');
const route = express.Router();
const {Index,Ajouter} = require('../Controllers/commande.comtroller');

route.get('/', Index);
route.get('/ajouter', Ajouter);


module.exports = route;
