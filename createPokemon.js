import express from "express"; //Import Express
import { Low } from "lowdb"; //Import the LowDB module. Uses a JSON file to create our "database"
import { JSONFile } from "lowdb/node";
import setupPokemonRoutes from "./controller/pokemonRoutes.js";


export default async function createPokemon() {
  const adapter = new JSONFile("db.json");
  const db = new Low(adapter);

  //Reads the database
  await db.read();

  //Checks if there is any data in the database. If not, we give default data.
  db.data = db.data || { pokemons: [] };

  //This writes to the database if there are any changes
  await db.write();

  const app = express();

  //Use Builtin middleware to extract JSON data from the body of any request made to the server
  app.use(express.json());
  app.use('/pokemon', setupPokemonRoutes(db))

  return app;
}