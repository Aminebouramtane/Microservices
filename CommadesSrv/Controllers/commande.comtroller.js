const Commande = require('../Models/commandes.model');

const amqp = require("amqplib");

const Index = async (req, resp) => {
  Commande.find()
    .then((commandes) =>
      resp.json({
        data: commandes,
      })
    )
    .catch((err) => console.log(err));
};

const Ajouter = async (req, resp) => {
  const ids = [2, 5, 3];
  const listId = ids.join("-");

  await sendMessage("cmdmsg", listId);
  await receiveMessage("productmsg", ids);
};

async function sendMessage(queueName, message) {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName);
  channel.sendToQueue(queueName, Buffer.from(message));
  console.log("Sent message:", message);
}

async function receiveMessage(queueName, ids) {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName);
  console.log("Waiting for messages...");

  channel.consume(queueName, async (message) => {
    const prices = message.content.toString().split("-");
    const totalPrices = prices.reduce((prev, next) => {
      return parseFloat(prev) + parseFloat(next);
    });

    channel.ack(message);

    const newCommande = new Commande({
      _id: Math.floor(Math.random() * 1000000),
      date: new Date(),
      produits: ids,
      prixtotal: totalPrices,
    });

    try {
      await newCommande.save();
      console.log("New Commande saved:", newCommande);
    } catch (error) {
      console.error("Error saving Commande:", error);
    }
    await channel.close();
    await connection.close();
  });
}

module.exports = { Index, Ajouter };
