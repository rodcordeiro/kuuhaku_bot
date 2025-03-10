import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { setTimeout as wait } from 'node:timers/promises';

export default class ProfileCommand {
  data = new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Shows user profile!');
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: false });
    await wait(5000);
    await interaction.editReply('User profile...');
  }
}
