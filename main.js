import createPokemon from "./createPokemon.js";

const server = await createPokemon();

server.listen(3000, () => {
  console.log("running on port 3000");
});