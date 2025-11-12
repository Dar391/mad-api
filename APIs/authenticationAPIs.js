const express = require("express");
const router = express.Router();
const { db } = require("../firebase");
const usersCollection = db.collection("users");
const profileCollection = db.collection("userProfile");

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = {
      firstName,
      lastName,
      email,
      password,
      registeredAt: new Date(),
    };

    const regResult = await usersCollection.add(newUser);

    const newProfile = {
      userID: regResult.id,
      firstName,
      lastName,
      email,
      address: "",
      phoneNumber: "",
      bio: "",
      age: null,
      registeredAt: new Date(),
    };

    const profileResult = await profileCollection.add(newProfile);

    res.status(201).json({
      registration: {
        userID: regResult.id,
        ...newUser,
      },
      profile: {
        profileID: profileResult.id,
        ...newProfile,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await usersCollection.where("email", "==", email).get();
    if (result.empty) {
      return res.status(404).json({ error: "User not found" });
    }

    const userDoc = result.docs[0];
    const userData = userDoc.data();

    if (userData.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // await secureStore.setItemAsync("userID", userDoc.id);
    // const storeUserID = secureStore.getItem
    res.status(200).json({ id: userDoc.id, ...userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/getUsers", async (req, res) => {
  try {
    const allUsers = await usersCollection
      .select("email", "registeredAt")
      .orderBy("registeredAt", "asc")
      .get();
    const userArray = [];

    allUsers.forEach((doc) => {
      const data = doc.data();
      const formattedDate = data.registeredAt.toDate().toLocaleString(); 
      userArray.push({
        id: doc.id,
        email: data.email,
        registeredAt: formattedDate,
      });
    });

    res.status(200).json(userArray);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
