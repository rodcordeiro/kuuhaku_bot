import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from "discord.js";

import { client } from "../../core/client";
export default class HelpCommand {
  data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows bot help!");
  async execute(interaction: ChatInputCommandInteraction) {
    const commandData = client.commands.map((c: any) => {
      return {
        name: c.data.name,
        value: c.data.description || "\u200B",
      };
    });
    const embed = new EmbedBuilder()
      .setTitle("Command list:")
      .setDescription(
        "_Commands without description could be context commands. Tried my best to maintain self-describing_"
      )
      .setFields(commandData)
      .setAuthor({
        name: "<Kuuhaku />",
        iconURL:
          "https://rodcordeiro.github.io/shares/img/shiro_nogamenolife.jpg",
      });
    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
}
