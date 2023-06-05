const Produit = require("../Models/produits.model");
const amqp = require("amqplib");

// -------------- a ----------------

const Index = async (req, resp) => {
  Produit.find()
    .then((data) => {
      resp.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      resp.status(400).json({
        success: false,
        data: null,
        message: err,
      });
    });
};

// -------------- b ----------------

const getPrice = async (idP) => {
  try {
    let data = await Produit.findById(idP);
    if (data) {
      return {
        success: true,
        data: data.prixUnitaire,
      };
    } else {
      return {
        success: false,
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.toString(),
    };
  }
};

// -------------- c ----------------

const Ajouter = async (req, resp) => {
  try {
    console.log(req.body); 
    const newProduit = new Produit(req.body);
    await newProduit.save();
    resp.status(200).json({
      success: true,
      data: newProduit,
      message: "Produit ajouté",
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      success: false,
      message: "Une erreur s'est produite lors de l'ajout du produit",
    });
  }
};

// ----------------- d ---------------

const Supprimer = async (req, resp) => {
  try {
    let data = await Produit.findByIdAndDelete(req.params.id);
    if (data) {
      await produit.remove();
      resp.status(202).json({
        success: true,
        data: data,
        message: "Produit bien Supprimer",
      });
    } else {
      resp.status(401).json({
        success: false,
        data: null,
        message: "Il n'exist aucun Produit avec ce id",
      });
    }
  } catch (error) {
    resp.status(501).json({
      success: false,
      data: null,
      message: error,
    });
  }
};

// ------------------------ e ---------------

const ModifierPrix = async (req, resp) => {
  try {
    let data = await Produit.findById(req.params.id);
    if (data) {
      data.prixUnitaire = req.params.newPricing;
      await data.save();
      resp.status(401).json({
        success: true,
        data: data,
        message: "Produit Modifier avec success",
      });
    } else {
      resp.status(401).json({
        success: false,
        data: null,
        message: "Il n'exist aucun Produit avec ce id",
      });
    }
  } catch (error) {
    resp.status(501).json({
      success: false,
      data: null,
      message: error,
    });
  }
};


// const AMQResponse = async (idP) => {
//   const pricesString = [];
//   const pricePromises = idP.map((id) => getPrice(id).then(data => {
//     pricesString.push(data.data);
//   }));

//   await Promise.all(pricePromises); 
//   sendMessage(pricesString.join("-")); 
// };

  

// async function sendMessage(prices) {
//   const responseQueue = "productmsg";
//   const connection = await amqp.connect("amqp://localhost");
//   const channel = await connection.createChannel();
//   await channel.assertQueue(responseQueue);
//   channel.sendToQueue(responseQueue, Buffer.from(prices))
// }

// async function receiveMessage(queueName) {
//   const connection = await amqp.connect("amqp://localhost");
//   const channel = await connection.createChannel();
//   await channel.assertQueue(queueName);
//   console.log("Waiting for messages...");
//   await channel.consume(queueName, (message) => {
//     const idP = message.content.toString().split("-");
//     console.log("Received message with idP in produit:", idP); 
//     AMQResponse(idP); 
  
//     {
//       noAck: true;
//     }
//   });
// }

// receiveMessage("cmdmsg");

module.exports = { Index, getPrice, Ajouter, ModifierPrix, Supprimer };
