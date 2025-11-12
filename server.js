const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

//APIs
const authAPI = require("./APIs/authenticationAPIs");
const profileAPI = require("./APIs/profileAPIs");


app.get("/", (req, res) => {
  res.send(`Server is running at ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.use("/authAPIs", authAPI);
app.use("/profileAPIs", profileAPI);

/**
 * const { db } = require("./firebase");
 * //naming and calling the collection
const tasksCollection = db.collection("tasks");
const usersCollection = db.collection("users");
 * app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = {
      firstName,
      lastName,
      email,
      password,
      registeredAt: new Date(),
    };
    const docRef = await usersCollection.add(newUser);
    res.status(201).json({ id: docRef.id, ...newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/getUsers", async (req, res) => {
  try {
    const allUsers = await usersCollection.get();
    const userArray = [];

    allUsers.forEach((value) => {
      userArray.push({ id: value.id, ...value.data() });
    });
    res.status(200).json(userArray);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/addTask", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description)
      return res.status(400).json({ error: "Missing fields" });
    const newTask = {
      title,
      description,
      createdAt: new Date(),
    };
    const docRef = await usersCollection.add(newTask);
    res.status(201).json({ id: docRef.id, ...newTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/getTasks", async (req, res) => {
  try {
    const result = await tasksCollection.get();
    const tasks = [];
    result.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/updateTask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing task ID" });
    const { title, description } = req.body;
    if (!title || !description)
      return res.status(400).json({ error: "Missing fields" });

    const updatedTask = {
      title,
      description,
      updatedAt: new Date(),
    };
    await tasksCollection.doc(id).update(updatedTask);
    res.status(200).json({ id, ...updatedTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing task ID" });
    await tasksCollection.doc(id).delete();
    res.status(200).json({ message: `Task ${id} deleted successfully.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 * 
 */
