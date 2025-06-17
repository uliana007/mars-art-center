const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // путь к твоему ключу
const exhibitions = require("./exhibitions.json"); // путь к твоему json

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function importExhibitions() {
  for (const exhibition of exhibitions) {
    // коллекция будет называться "exhibitions"
    await db.collection("exhibitions").doc(exhibition.id).set(exhibition);
    console.log(`Imported exhibition ${exhibition.id}`);
  }
  console.log("Import finished!");
  process.exit();
}

importExhibitions().catch(console.error);