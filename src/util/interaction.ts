import {
   CommandInteraction,
   MessageComponentInteraction,
   SelectMenuInteraction,
   InteractionReplyOptions,
} from "discord.js";

export async function defer(
   interaction: CommandInteraction | MessageComponentInteraction,
   options?: InteractionReplyOptions,
) {
   try {
      await interaction.deferReply(options);
   } catch (e) {
      console.log("Can't defer interaction");
   }
}
export async function deferUpdate(
   interaction: SelectMenuInteraction | MessageComponentInteraction,
   options?: InteractionReplyOptions,
) {
   try {
      await interaction.deferUpdate(options);
   } catch (e) {
      console.log("Can't defer update interaction");
   }
}
export async function followUp(
   interaction: CommandInteraction,
   options: InteractionReplyOptions,
) {
   try {
      await interaction.followUp(options);
   } catch (e) {
      console.log("Can't follow up interaction");
   }
}
export async function edit(
   interaction: CommandInteraction | MessageComponentInteraction,
   options: InteractionReplyOptions,
) {
   try {
      await interaction.editReply(options);
   } catch (e) {
      console.log("Can't edit interaction");
   }
}

export async function reply(
   interaction: CommandInteraction,
   options: InteractionReplyOptions,
) {
   try {
      await interaction.reply(options);
   } catch (e) {
      console.log("Can't reply interaction", e);
   }
}

export async function editReply(
   interaction: CommandInteraction | MessageComponentInteraction,
   options: InteractionReplyOptions,
) {
   try {
      await interaction.editReply(options);
   } catch (e) {
      console.log("Can't edit reply interaction", e);
   }
}
