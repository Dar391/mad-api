const admin = require("firebase-admin");
const serviceKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceKey),
});
const db = admin.firestore();

module.exports = { db, admin };
