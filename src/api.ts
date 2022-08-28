import { existsSync, readdirSync } from "fs";
import { join } from "path";
import { deploy } from "./util/console";
import fastify from "fastify";
const argv = require("yargs-parser")(process.argv.slice(2));

const dirExists = existsSync(join("src", "api"));

(() => {
   if (!dirExists) return;

   const server = fastify();
   const dir = readdirSync(join("src", "api"));

   server.listen(
      {
         port: argv.port || 5050,
      },
      (error, address) => {
         if (error) throw error;
         deploy("Server is now listening to " + address);
      },
   );
})();
