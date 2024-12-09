/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';

import { config } from '../../common/config';
import { getAzureConnection } from '../../core/azure/client.azure';
import { GuildServices } from '../../services/guild.service';

export default class AzureCommand {
  data = new SlashCommandBuilder()
    .setName('azure')
    .setDescription('Azure test command')
    .addStringOption(option =>
      option
        .setName('project')
        .setDescription('Filters by project')
        .setAutocomplete(true),
    );

  async autocomplete(interaction: AutocompleteInteraction) {
    const guild = await GuildServices.findOne({
      guildId: interaction.guildId!,
    });
    if (!guild.azureToken || !guild.azureOrganization) {
      return await interaction.respond([]);
    }

    const azure = getAzureConnection({
      ORG: guild.azureOrganization,
      PAT: JSON.parse(
        Buffer.from(guild.azureToken, 'base64').toString('utf-8'),
      ),
    });

    const focusedValue = interaction.options.getFocused();
    const coreClient = await azure.getCoreApi();
    const projects = await coreClient.getProjects();

    const filtered = projects.filter(project => {
      return project.name!.toLowerCase().includes(focusedValue);
    });

    await interaction.respond(
      filtered.map(choice => ({ name: choice.name!, value: choice.name! })),
    );
  }

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: false });
    try {
      const guild = await GuildServices.findOne({
        guildId: interaction.guildId!,
      });
      if (!guild.azureToken) {
        await interaction.editReply(
          'Azure PAT not provided. Please configure it first',
        );
        return;
      }
      if (!guild.azureQueryId) {
        await interaction.editReply(
          'Azure Query Id not provided. Please configure it first. *Important: This query must have access to view all projects, so remember to check the view all programs*',
        );
        return;
      }
      if (!guild.azureOrganization) {
        await interaction.editReply(
          'Azure Organization not provided. Please configure it first.',
        );
        return;
      }

      const azure = getAzureConnection({
        ORG: guild.azureOrganization,
        PAT: JSON.parse(
          Buffer.from(guild.azureToken, 'base64').toString('utf-8'),
        ),
      });

      // console.log(client);
      // await interaction.editReply(
      //   "Command still being implemented. Be patient"
      // );

      // const projectParam = await interaction.options.getString("project");

      const client = await azure.getWorkItemTrackingApi();
      const queryResult = await client.queryById(config.azure.QUERY_ID);

      console.debug('[queryResult]', queryResult);
      await interaction.editReply(
        'Command still being implemented. Be patient',
      );
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
