const admin = require("firebase-admin");
const fs = require("fs");

// Импортируй ключ сервисного аккаунта
const serviceAccount = require("./serviceAccountKey.json");
// Импортируй статьи
const articles = require("./media-articles.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function importArticles() {
  for (const article of articles) {
    // Используем id статьи как id документа
    await db.collection("media").doc(article.id).set(article);
    console.log(`Imported article ${article.id}`);
  }
  console.log("Import finished!");
  process.exit();
}

importArticles().catch(console.error);