import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { setTimeout as wait } from "node:timers/promises";

import { azure } from "../../core/azure/client.azure";

export default class AzureCommand {
  data = new SlashCommandBuilder()
    .setName("azure")
    .setDescription("Azure test command");

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply("User profile...");

    // await interaction.deferReply({ ephemeral: false });
    // const profile = await azure.getProfileApi();
    // const task = await azure.getTaskApi();
    const core = await azure.getCoreApi();
    const client = await azure.getWorkItemTrackingApi();
    console.log(await core.getProjects());
    console.log(await client.getAccountMyWorkData(1));
    // await wait(2000);
  }
}
