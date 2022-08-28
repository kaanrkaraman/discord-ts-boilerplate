import "dotenv/config";
import { Routes } from "discord-api-types/v10";
import { REST } from "discord.js";
import { deploy } from "./util/console";
import * as commandModules from "./commands";

interface Command {
   data: unknown;
}
const commands: Array<Command> = [];
// @ts-ignore
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

for (const commandModule of Object.values<any>(commandModules)) {
   commands.push(commandModule.data);
}

(async () => {
   try {
      // prettier-ignore
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
            body: commands,
         })
         .then(() => deploy("Deployed application commands."));
      return true;
   } catch (error) {
      console.error(error);
      return false;
   }
})();
