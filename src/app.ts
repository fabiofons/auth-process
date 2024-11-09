import { envs } from "./config/envs";
import { Server } from "./presentation/server"

(() => {
  main()
})()

async function main() {
  //todo await database;

  //todo inicio de nuestro server
  new Server({ port: envs.PORT }).start();
}