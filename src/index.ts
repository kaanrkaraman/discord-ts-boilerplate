import "dotenv/config";
import "./api";
import { success } from "./util/console";
import * as commandModules from "./commands";

const commands = Object(commandModules);
import { Client } from "discord.js";
const client = new Client({ intents: ["Guilds", "GuildMessages"] });

client.login(process.env.TOKEN);

client.on("ready", () => {
   success(`Logged in as ${client.user?.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
   if (!interaction.isChatInputCommand()) return;

   const { commandName } = interaction;
   commands[commandName].execute(interaction, client);
});

export function expose() {
   return {
      commandModules,
   };
}
