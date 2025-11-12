const admin = require("firebase-admin");
const serviceKey = require("./db-config/serviceKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceKey),
});
const db = admin.firestore();

module.exports = { db, admin };
