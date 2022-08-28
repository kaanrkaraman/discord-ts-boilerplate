interface DataObject {
   name: string;
   description: string;
   options: Array<any>;
   default_permission: any;
   default_member_permissions: any;
   dm_permission: any;
}

import { SlashCommandBuilder } from "@discordjs/builders";
import {
   CommandInteraction,
   EmbedBuilder,
   ActionRowBuilder,
   ButtonBuilder,
   ButtonStyle,
   ButtonInteraction,
   MessageComponentInteraction,
   APIEmbedField,
} from "discord.js";
import { reply } from "../util/interaction";
import { expose } from "..";

const Embed = new EmbedBuilder();

const commandsPerPage = 5;
let page = 0;

export const data = new SlashCommandBuilder()
   .setName("help")
   .setDescription("Creates the help interface.")
   .addStringOption((option) =>
      option
         .setName("command")
         .setDescription(
            "Specify command name to see the description and arguments of a command",
         )
         .setRequired(false),
   );

export async function execute(interaction: CommandInteraction) {
   const filter = (i: MessageComponentInteraction) => {
      return (
         ["prev", "next".includes(i.customId)] &&
         i.user.id === interaction.user.id
      );
   };
   // @ts-ignore
   const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 60e3, // Concatenate 60 with 3 zeros
   });

   const { commandModules } = expose();
   const commands = Object.entries(commandModules);
   const pageCount = Math.floor(commands.length / commandsPerPage);

   Embed.setColor("#fff");
   Embed.setDescription(page.toString());

   const fields: Array<APIEmbedField> = [];
   for (const [name, dataObject] of commands) {
      const field = {} as APIEmbedField;
      const data = dataObject.data as DataObject;
      field.name =
         "/" + name + (data.options.length === 0 ? "" : " [, options]");
      field.value = data.description;
      fields.push(field);
   }
   Embed.addFields(fields.slice(page * 5, (page + 1) * 5));

   collector.on("collect", async (buttonInteraction: ButtonInteraction) => {
      Embed.setTitle(null);

      if (buttonInteraction.customId === "prev") {
         if (page === 0) Embed.setTitle("You are at the first page");
         page !== 0 && page--;
         Embed.setFields(fields.slice(page * 5, (page + 1) * 5));
      } else if (buttonInteraction.customId === "next") {
         if (page === pageCount) Embed.setTitle("You are at the last page");
         page !== pageCount && page++;
         Embed.setFields(fields.slice(page * 5, (page + 1) * 5));
      }
      await buttonInteraction.update({
         embeds: [Embed.setDescription(page.toString())],
         components: [Buttons],
      });
   });

   const Buttons = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
         new ButtonBuilder()
            .setCustomId("prev")
            .setLabel("Previous")
            .setStyle(ButtonStyle.Primary),
      )
      .addComponents(
         new ButtonBuilder()
            .setCustomId("next")
            .setLabel("Next")
            .setStyle(ButtonStyle.Primary),
      );

   return reply(interaction, {
      embeds: [Embed],
      components: [Buttons],
   });
}
