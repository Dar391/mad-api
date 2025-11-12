const express = require("express");
const router = express.Router();
const { db } = require("../firebase"); // or wherever you exported it from
const profileCollection = db.collection("userProfile");
const userCollection = db.collection("users");

router.get("/getProfile/:userID", async (req, res) => {
  try {
    const { userID } = req.params;

    const result = await profileCollection.where("userID", "==", userID).get();
    if (result.empty) {
      return res.status(404).json({ error: "Profile not found" });
    }
    const profileDoc = result.docs[0];
    res.status(200).json({ id: profileDoc.id, ...profileDoc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/updateProfile/:userID", async (req, res) => {
  try {
    console.log(
      `Attempting to update profile for userID: ${req.params.userID}`
    );
    const { userID } = req.params;
    const { firstName, lastName, email, address, phoneNumber, bio, age } =
      req.body;

    console.log("Request body:", req.body);

    const result = await profileCollection.where("userID", "==", userID).get();
    if (result.empty) {
      console.log(`Profile not found for userID: ${userID}`);
      return res.status(404).json({ error: "Profile not found" });
    }

    const userData = result.docs[0];
    const updatedProfile = {
      firstName,
      lastName,
      email,
      address,
      phoneNumber,
      bio,
      age,
    };

    console.log("Updating profile with data:", updatedProfile);
    await profileCollection.doc(userData.id).update(updatedProfile);

    console.log(`Profile updated successfully for userID: ${userID}`);
    res.status(200).json({ id: userData.id, ...updatedProfile });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/deleteProfile/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    await userCollection.doc(userID).delete();
    const profileSnapshot = await profileCollection
      .where("userID", "==", userID)
      .get();
    if (!profileSnapshot.empty) {
      const profileDoc = profileSnapshot.docs[0];
      await profileDoc.ref.delete();
    }
    res.status(200).json({ message: "User and profile deleted successfully" });
  } catch (error) {
    console.error("Delete failed:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
