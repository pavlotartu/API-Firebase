const admin = require('firebase-admin');
const serviceAccount = require("./apis/keyimagen.json");
const data = require("././articles.json"); 
const collectionKey = "articles";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const articlesRef = firestore.collection(collectionKey);

data.forEach((article) => {
  articlesRef.add(article)
    .then((docRef) => {
      console.log(`Documento agregado con ID: ${docRef.id}`);
    })
    .catch((error) => {
      console.error("Error al agregar documento: ", error);
    });
});


//node articles.js para subir 