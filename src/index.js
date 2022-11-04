import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

//Conexão com o mongodb
const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
  console.log("MongoDB Conectado");
} catch (err) {
  console.log(err.message);
}

const db = mongoClient.db("batepapouol");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/receitas", async (req, res) => {
  try {
    const receita = req.body;
    await db.collection("receitas").insertOne(receita);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/receitas", async (req, res) => {
  try {
    const receitas = await db.collection("receitas").find().toArray();
    res.send(receitas);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(5000, () => console.log(`Server running in port: ${5000}`));
