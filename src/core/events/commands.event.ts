import { Events } from "discord.js"

import { client } from "../client"

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;


  const command = interaction.client.commands.get(interaction.commandName);
  if (!command || !command.execute) {
    return interaction.reply("Command not found or has no execution routine!")
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing ${interaction.commandName}`);
    console.error(error);
  }
});