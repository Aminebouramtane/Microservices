const express = require("express");
require("dotenv").config();
const app = express();
const url = process.env.URL_MONGODB;
const port = process.env.PORT;
const CommandeRoutes = require("./routes/commandesroute")
const connectTODB = require("./DB/db");
const rabbitmq = require("amqplib/callback_api");




        

app.use(express.json());
app.use('/commandes', CommandeRoutes);

connectTODB(url);


        //E1 : je vais Essayer de me connecté au serveur avec la méthode connect
        rabbitmq.connect(`amqp://localhost`,(err,connection)=>{
            if(err){
                throw err;
            }
            else{
                //E2 : Si pas de pb de connection au serveur amqp je vais créer une canal sur une queue collection et un message à envoyé 
                connection.createChannel(
                    (err,channel)=>{
                        if(err){
                            throw err;
                        }
                        else{
                            //E3 : je suis connecté et en meme temps j'ai ouver un canal avec le serveur pour envoyé ou lire des messages 
                            const queueName="DEVWFS";
                            const msg = "II. Hello this is an other step on Cloud Dev Application";
                            //E4 : je vais  créer le queue dans le  canal de connexion avec la queue 
                            channel.assertQueue(queueName,{durable:false});//durable : false afin quelle puissent expiré selon la config du serveur rabbitmq
                            //il faut compendre que dans un canal de communication entre mon service et le serveur rabbitMQ je peux créer pluisur queue
                            //E5 : L'envoi ou la lecture de la queue (dans ce cas c l'envoi)
                            channel.sendToQueue(queueName,Buffer.from(msg));
                            //E6 : notifié l'envoi du message
                            console.log("Le Message est bien Envoyé ;)");
                            //E7 : je ferme mon service (pas obligatoire c juste pour le tp )
                            setTimeout(()=>{
                                connection.close(),1000
                            });
                        }
                    }
                );

            }
        }
        );


app.listen(port,()=>{
    console.log("server connected in port 4000");
});
