import { existsSync, readdirSync, statSync } from "fs";
import { join, parse, sep } from "path";
import { deploy } from "./util/console";
import fastify from "fastify";
const argv = require("yargs-parser")(process.argv.slice(2));

export interface FastifyHandlerOptions {
   onSend?(): void;
}

const dirExists = existsSync(join("src", "api"));

(() => {
   if (!dirExists) return;

   const server = fastify();
   // TODO: Parse tsconfig.json to dynamically change out file.
   const dir = readdirSync(join("dist", "src", "api"));

   const files: any = [];

   function mapRoutes(routes: Array<any>, paths: Array<any> = []) {
      const dirname = join(__dirname, "api", ...paths);

      routes.forEach((route) => {
         const fullPath = join(dirname, route);
         if (statSync(fullPath).isDirectory()) {
            const { dir } = parse(fullPath);
            const res = dir.split(sep).slice(
               dir.split(sep).findIndex(function (d) {
                  // TODO: Parse tsconfig.json to dynamically change out file.
                  return d === "dist";
               }),
            );
            res?.push(route);

            mapRoutes(readdirSync(fullPath), res.slice(3));
         } else
            paths?.length === 0
               ? files.push(route)
               : files.push(paths.concat(route));
      });
   }

   const AsyncFunction = Object.getPrototypeOf(async function () {})
      .constructor;

   type RequestMethod = "get" | "post" | "patch" | "delete" | "put" | "all";

   function createEndpoints() {
      files.forEach((file: Array<string> | string) => {
         let method: RequestMethod;

         if (!Array.isArray(file)) file = [file];

         if (Array.isArray(file)) file = file.join(sep);
         if (file.endsWith(".js")) file = file.slice(0, -3);

         const { handle, options } = require("./api/" + file);
         if (!handle) {
            const Err = new Error();
            Err.name = "[API ERROR] Cannot find handle function";
            Err.message = file + " doesn't export an handle function.";
            throw Err;
         }

         if (!(handle instanceof AsyncFunction)) {
            const Err = new Error();
            Err.name = "[API ERROR] Handle is not an async function";
            Err.message =
               " Exported handle function at " + file + " is not asynchronous.";
            throw Err;
         }

         const validMethods = ["get", "post", "patch", "delete", "put"];
         const identifier = file.split(".")[file.split(".").length - 1];
         if (validMethods.includes(identifier)) {
            file = file.split(".").slice(0, -1).join("");
            method = identifier as RequestMethod;
         } else method = "all";

         if (/index$/s.test(file)) file = file.replace(/index$/s, "");

         if (method === "get") {
            server.get("/" + file, options, handle);
         } else if (method === "post") {
            server.post("/" + file, options, handle);
         } else if (method === "patch") {
            server.patch("/" + file, options, handle);
         } else if (method === "delete") {
            server.delete("/" + file, options, handle);
         } else if (method === "put") {
            server.put("/" + file, options, handle);
         } else if (method === "all") {
            server.all("/" + file, options, handle);
         }
      });
   }

   try {
      mapRoutes(dir);
      createEndpoints();
   } catch (error) {
      const Err = new Error();
      Err.name = "[API ERROR]";
      throw Err;
   }

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
