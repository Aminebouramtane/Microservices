const express = require("express");
require("dotenv").config();
const app = express();
const url = process.env.URL_MONGODB;
const port = process.env.PORT;
const ProduitRoutes = require('./routes/produitsroute');
const connectTODB = require("./DB/db");


app.use(express.json());
app.use('/produits', ProduitRoutes);


connectTODB(url);

app.listen(port,()=>{
    console.log("server connected in port 5000");
});



// 7 ======================================================= :

// a.--------------------------------------- :
// Le rôle d'un reverse proxy est de servir d'intermédiaire entre les clients et les serveurs. Il permet de gérer le trafic,
// d'optimiser les performances et de renforcer la sécurité. Le reverse proxy reçoit les requêtes des clients, 
//les transmet aux serveurs appropriés et renvoie les réponses aux clients.
//-----------------------------------------------
// Les étapes d'installation et de mise en service de Nginx :
        // 1-Installez Nginx en utilisant la commande spécifique à votre système d'exploitation.
        // 2-Configurez Nginx en modifiant le fichier de configuration principal (nginx.conf) pour spécifier les paramètres tels que les ports d'écoute et les règles de routage.
        // 3-Redémarrez Nginx pour appliquer les modifications de configuration.
        // 4-Vérifiez que Nginx est en cours d'exécution en accédant à l'adresse IP et au port spécifiés dans la configuration.
// b.----------------------------------------------------- :

// L'acronyme AMQP signifie Advanced Message Queuing Protocol.
//Il s'agit d'un protocole de messagerie avancé qui permet l'échange de messages entre applications.
//AMQP fournit des fonctionnalités de messagerie fiables et garantit la livraison des messages dans l'ordre correct.
//------------------------------------------------------ :

// c.Les étapes d'installation et de mise en service du serveur AMQP, RabbitMQ, sont les suivantes :
        // 1-Téléchargez et installez RabbitMQ en utilisant le package spécifique à votre système d'exploitation.
        // 2-Démarrez le serveur RabbitMQ.
        // 3-Vérifiez que le serveur RabbitMQ est en cours d'exécution en accédant à l'interface de gestion Web à l'adresse spécifiée (par défaut, http://localhost:15672).
        // 4-Configurez les utilisateurs et les autorisations d'accès au serveur RabbitMQ via l'interface de gestion Web ou en utilisant la ligne de commande.
        // 5-Utilisez les bibliothèques AMQP appropriées dans votre application pour communiquer avec le serveur RabbitMQ et envoyer/recevoir des messages via les files d'attente.