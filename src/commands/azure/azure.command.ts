/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AutocompleteInteraction } from "discord.js";
import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { Pagination } from "pagination.djs";

import { azure } from "../../core/azure/client.azure";
import { config } from "../../common/config";
import { GuildServices } from "../../services/guild.service";
import { EmbedCards } from "./utils/embed.util";
import { IWorkItemModel, WorkItemModel } from "./utils/WorkItem.util";

export default class AzureCommand {
  data = new SlashCommandBuilder()
    .setName("azure")
    .setDescription("Azure test command")
    .addStringOption((option) =>
      option
        .setName("project")
        .setDescription("Filters by project")
        .setAutocomplete(true),
    );

  async autocomplete(interaction: AutocompleteInteraction) {
    const focusedValue = interaction.options.getFocused();
    const coreClient = await azure.getCoreApi();
    const projects = await coreClient.getProjects();

    const filtered = projects.filter((project) => {
      return project.name!.toLowerCase().includes(focusedValue);
    });

    await interaction.respond(
      filtered.map((choice) => ({ name: choice.name!, value: choice.name! })),
    );
  }

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: false });
    try {
      const guild = await GuildServices.findOne({
        guildId: interaction.guildId,
      });
      if (!guild.azureToken) {
        await interaction.editReply(
          "Azure PAT not provided. Please configure it first",
        );
        return;
      }
      if (!guild.azureQueryId) {
        await interaction.editReply(
          "Azure Query Id not provided. Please configure it first. *Important: This query must have access to view all projects, so remember to check the view all programs*",
        );
        return;
      }
      if (!guild.azureOrganization) {
        await interaction.editReply(
          "Azure Organization not provided. Please configure it first.",
        );
        return;
      }
      await interaction.editReply(
        "Command still being implemented. Be patient",
      );
      return;
      //   const projectParam = await interaction.options.getString("project");

      //   const client = await azure.getWorkItemTrackingApi();
      //   const queryResult = await client.queryById(config.azure.QUERY_ID);

      //   const workItems = await Promise.all(
      //     queryResult.workItems!.map(
      //       async (workItem) =>
      //         await client.getWorkItem(Number(workItem.id), [
      //           "System.AssignedTo",
      //           "System.Title",
      //           "System.TeamProject",
      //           "System.WorkItemType",
      //           "Custom.Projeto",
      //         ])
      //     )
      //   ).then((items) =>
      //     items.map((item) => {
      //       // console.log(item);
      //       return WorkItemModel.assing(item);
      //     })
      //   );

      //   const embeds = EmbedCards(
      //     projectParam
      //       ? (workItems.filter(
      //           (card) =>
      //             card.project.toLowerCase() === projectParam.toLowerCase()
      //         ) as unknown as IWorkItemModel[])
      //       : (workItems as unknown as IWorkItemModel[])
      //   );
      //   const pagination = new Pagination(interaction as any, {
      //     idle: 30000,
      //     loop: true,
      //   });
      //   pagination.setEmbeds(embeds);

      //   const payload = pagination.ready();
      //   const message = await interaction.editReply(payload);
      //   pagination.paginate(message);
    } catch (err) {
      console.error(err);
      await interaction.editReply(
        "Whops... Couldn't process. Try again later, please.",
      );
    }
  }
}
