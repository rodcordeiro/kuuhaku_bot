import { AutocompleteInteraction } from "discord.js";
import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

import { config } from "../../common/config";
import { GuildServices } from "../../services/guild.service";

import { CONFIG_OPTIONS } from "./utils/constants.utils";

export default class ConfigCommand {
  data = new SlashCommandBuilder()
    .setName("config")
    .setDescription("Configure bot options")
    .addStringOption((option) =>
      option
        .setName("config")
        .setDescription("What will be configured")
        .setRequired(true)
        .setAutocomplete(true),
    )
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription("Configuration value")
        .setRequired(true),
    );

  async autocomplete(interaction: AutocompleteInteraction) {
    const focusedValue = interaction.options.getFocused();
    await interaction.respond(CONFIG_OPTIONS);
  }
  async execute(interaction: ChatInputCommandInteraction) {
    console.log(interaction);
  }
}
