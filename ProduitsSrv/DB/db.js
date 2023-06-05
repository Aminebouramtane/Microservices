// Étapes pour la mise en œuvre d'une base de données sur Mongo Atlas

// 1. Créez un compte sur le site web de Mongo Atlas.
// 2. Créez un nouveau cluster MongoDB sur Mongo Atlas.
// 3. Configurez les paramètres du cluster, tels que la région, la taille du cluster, etc.
// 4. Ajoutez un utilisateur de base de données avec des privilèges appropriés.
// 5. Définissez les règles d'accès réseau pour permettre la connexion à votre cluster.
// 6. Obtenez la chaîne de connexion (connection string) pour votre cluster depuis Mongo Atlas.
// 7. Dans le fichier DB.js, vous pouvez stocker la chaîne de connexion dans une variable, par exemple "mongoURI".
// 8. Assurez-vous d'encoder la chaîne de connexion en utilisant la méthode appropriée, par exemple encodeURIComponent.


const mongoose = require("mongoose");

function connectTODB(url){

    mongoose.connect(url, { useNewUrlParser: true });
    const db = mongoose.connection;
    
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    console.log("Database connected successfully!");
    });
    
}

module.exports = connectTODB ;

