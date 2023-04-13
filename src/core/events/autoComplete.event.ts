import { Events } from "discord.js";

import { client } from "../client";

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isAutocomplete()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command || !command.autocomplete) {
    return interaction.reply(
      "Command not found or has no autocomplete routine!"
    );
  }
  try {
    await command.autocomplete(interaction);
  } catch (error) {
    console.error(error);
  }
});
