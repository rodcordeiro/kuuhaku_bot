/* eslint-disable @typescript-eslint/ban-ts-comment */
import { StringSelectMenuBuilder } from "@discordjs/builders";
import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ModalSubmitInteraction,
} from "discord.js";

import { azure } from "../../core/azure/client.azure";

export default class CreateCommand {
  data = new SlashCommandBuilder()
    .setName("create")
    .setDescription("Create a new task");

  async execute(interaction: ChatInputCommandInteraction) {
    // await interaction.deferReply({ ephemeral: false });
    const coreClient = await azure.getCoreApi();
    const wiClient = await azure.getWorkItemTrackingApi();
    const projects = await coreClient.getProjects();
    const workItemTypes = await Promise.all(
      projects.map(
        async (project) => await wiClient.getWorkItemTypes(String(project.name))
      )
    ).then((workItemTypes) => workItemTypes);
    const modal = new ModalBuilder()
      .setCustomId("azure_work_item_creation")
      .setTitle("Azure card creation");

    const cardTitle = new TextInputBuilder()
      .setCustomId("azure_work_item_creation_title")
      .setLabel("Card title:")
      .setStyle(TextInputStyle.Short);

    const cardDescription = new TextInputBuilder()
      .setCustomId("azure_work_item_creation_description")
      .setLabel("Describe the card:")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(false);

    const titleActionRow = new ActionRowBuilder().addComponents(cardTitle);
    const descriptionActionRow = new ActionRowBuilder().addComponents(
      cardDescription
    );

    // @ts-ignore
    modal.addComponents(titleActionRow, descriptionActionRow);

    await interaction.showModal(modal);
  }

  async create(interaction: ModalSubmitInteraction) {
    const title = interaction.fields.getTextInputValue(
      "azure_work_item_creation_title"
    );
    const description = interaction.fields.getTextInputValue(
      "azure_work_item_creation_description"
    );
    console.log({ title, description });
    await interaction.reply({
      content: "Your submission was received successfully!",
    });
  }
}
