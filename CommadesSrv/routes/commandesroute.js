const express = require('express');
const route = express.Router();
const CommandeController = require('../Controllers/commande.comtroller');

route.get('/', CommandeController.index);


module.exports = route;
