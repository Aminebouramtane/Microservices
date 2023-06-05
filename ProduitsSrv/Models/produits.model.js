const mongoose = require("mongoose");

const produitsTable = new mongoose.Schema(
    {
		id: String,
		nom:String,
		marque:String,
		prixUnitaire:Number
    }
)

module.exports = mongoose.model("produits",produitsTable);