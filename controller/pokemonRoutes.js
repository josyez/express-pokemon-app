import express from "express";
import { nanoid } from "nanoid";


export default function setupPokemonRoutes(db) {
  const router = express.Router();

  //   get all pokemons
  router.get("/", (request, responde) => {
    responde.status(200).json({
      success: true,
      pokemons: db.data.pokemons,
    });
  });

  //   get one pokemon

  router.get("/:id", (request, res) => {
    const pokemonId = request.params.id;
    const pokemon = db.data.pokemons.find(
      (element) => element.id === pokemonId
    );

    res.status(200).json({
      success: true,
      pokemons: pokemon,
    });
  });

  //   create pokemon
  router.post("/", (request, responde) => {
    db.data.pokemons.push({
      id: nanoid(4),
      name: request.body.name,
    });

    db.write();

    responde.status(201).json({
      success: true,
    });
  });

  //   update pokemon
  router.put("/:id", (request, responde) => {
    const pokemon = request.params.id;

    const pokemonIndex = db.data.pokemons.findIndex(
      (element) => element.id === pokemon
    );

    db.data.pokemons[pokemonIndex].name = request.body.name;

    db.write();

    responde.status(200).json({
      success: true,
    });
  });

  //   delete pokemon
  router.delete("/:id", (request, responde) => {
    const pokemon = request.params.id;
    const pokemonIndex = db.data.pokemons.findIndex(
      (element) => element.id === pokemon
    );
    db.data.pokemons.splice(pokemonIndex, 1);

    db.write();
    responde.status(200).json({
      success: true,
      name: db.data.pokemons,
    });
  });

  return router;
}