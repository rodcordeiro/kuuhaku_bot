/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  Options,
} from "discord.js";

import { azure } from "../../core/azure/client.azure";
import { EmbedCards } from "./utils/embed.util";
import { IWorkItemModel, WorkItemModel } from "./utils/WorkItem.util";
export default class AzureCommand {
  data = new SlashCommandBuilder()
    .setName("azure")
    .setDescription("Azure test command")
    .addStringOption((option) =>
      option.setName("project").setDescription("Filters by project")
    );

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: false });
    const projectParam = await interaction.options.getString("project");

    const client = await azure.getWorkItemTrackingApi();
    const queryResult = await client.queryById(
      "c4bcddee-ea7d-4b79-8f07-59c2fcba94fd"
    );

    const workItems = await Promise.all(
      queryResult.workItems!.map(
        async (workItem) => await client.getWorkItem(Number(workItem.id))
      )
    ).then((items) => items.map((item) => WorkItemModel.assing(item)));

    const embeds = EmbedCards(
      projectParam
        ? (workItems.filter(
            // @ts-ignore
            (card) => card.project.toLowerCase() === projectParam.toLowerCase()
          ) as unknown as IWorkItemModel[])
        : (workItems as unknown as IWorkItemModel[])
    );
    await interaction.editReply({ embeds: [embeds] });
  }
}
