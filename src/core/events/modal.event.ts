/* eslint-disable @typescript-eslint/ban-ts-comment  */
import { Events } from "discord.js";

import { client } from "../client";

// @ts-ignore
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId === "azure_work_item_creation") {
    const command = client.commands.get("create");
    await command.create(interaction);
  }
});
