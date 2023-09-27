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
        .setAutocomplete(true)
    )
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription("Configuration value")
        .setRequired(true)
    );

  async autocomplete(interaction: AutocompleteInteraction) {
    // const focusedValue = interaction.options.getFocused();
    await interaction.respond(CONFIG_OPTIONS);
  }
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: false });
    try {
      const options = {
        config: interaction.options.getString("config"),
        content: interaction.options.getString("content"),
      };
      const guild = await GuildServices.findOne({
        guildId: interaction.guildId!,
      });
      if (options.config === "azureToken") {
        options.content = Buffer.from(
          JSON.stringify(options.content),
          "utf-8"
        ).toString("base64");
      }
      await GuildServices.update({
        ...guild,
        [options.config!]: options.content,
      });

      await interaction.editReply(`Whooo, we're good!`);
    } catch (err) {
      console.error(err);
      await interaction.editReply(
        "Whops... Couldn't process. Try again later, please."
      );
    }
  }
}
