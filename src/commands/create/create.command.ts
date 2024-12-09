/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ActionRowBuilder,
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  ColorResolvable,
  Colors,
  EmbedBuilder,
  ModalBuilder,
  ModalSubmitInteraction,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

import { azure } from '../../core/azure/client.azure';
import { client } from '../../core/discord/client.discord';

export default class CreateCommand {
  data = new SlashCommandBuilder()
    .setName('create')
    .setDescription('Create a new task')
    .addStringOption(option =>
      option
        .setName('project')
        .setDescription('Project to attribute')
        .setRequired(true)
        .setAutocomplete(true),
    )
    .addStringOption(option =>
      option
        .setName('item')
        .setDescription('Work Item type')
        .setRequired(true)
        .setAutocomplete(true),
    )
    .addStringOption(option =>
      option.setName('title').setDescription('Card Title').setRequired(true),
    )
    .addBooleanOption(option =>
      option.setName('description').setDescription('Add card description'),
    );

  async autocomplete(interaction: AutocompleteInteraction) {
    const focusedValue = interaction.options.getFocused(true);
    const coreClient = await azure.getCoreApi();
    const projects = await coreClient.getProjects();
    let filtered: Array<{ [k: string]: any }> = [];

    if (focusedValue.name === 'project') {
      filtered = projects.filter(project => {
        return project.name?.toLowerCase().includes(focusedValue.value);
      });
    }

    if (focusedValue.name === 'item') {
      const wiClient = await azure.getWorkItemTrackingApi();
      const project = interaction.options.getString('project');

      const workItemTypes = await wiClient
        .getWorkItemTypes(String(project))
        .then(workItemTypes => workItemTypes);
      filtered = workItemTypes;
    }

    await interaction.respond(
      filtered.map(choice => ({
        name: String(choice.name),
        value: String(choice.name),
      })),
    );
  }
  async execute(interaction: ChatInputCommandInteraction) {
    if (
      interaction.options.data.find(
        option => option.name === 'description' && option.value === true,
      )
    ) {
      const modal = new ModalBuilder()
        .setCustomId('azure_work_item_creation')
        .setTitle('Azure card creation');

      const cardTitle = new TextInputBuilder()
        .setCustomId('azure_work_item_creation_title')
        .setLabel('Card title:')
        .setStyle(TextInputStyle.Short)
        .setValue(interaction.options.getString('title') || '');
      const cardDescription = new TextInputBuilder()
        .setCustomId('azure_work_item_creation_description')
        .setLabel('Describe the card:')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false);
      const cardProject = new TextInputBuilder()
        .setCustomId('azure_work_item_creation_project')
        .setLabel('Project:')
        .setStyle(TextInputStyle.Short)
        .setValue(String(interaction.options.getString('project')));
      const cardType = new TextInputBuilder()
        .setCustomId('azure_work_item_creation_type')
        .setLabel('Work Item Type:')
        .setStyle(TextInputStyle.Short)
        .setValue(String(interaction.options.getString('item')));

      const titleActionRow = new ActionRowBuilder().addComponents(cardTitle);
      const descriptionActionRow = new ActionRowBuilder().addComponents(
        cardDescription,
      );
      const projectRow = new ActionRowBuilder().addComponents(cardProject);
      const typeRow = new ActionRowBuilder().addComponents(cardType);

      modal.addComponents(
        // @ts-ignore
        titleActionRow,
        descriptionActionRow,
        projectRow,
        typeRow,
      );

      client.modalHandlers?.push({
        modal: 'azure_work_item_creation',
        command: 'create',
      });

      return await interaction.showModal(modal);
    }

    const project = String(interaction.options.getString('project'));
    const item = String(interaction.options.getString('item'));
    const title = String(interaction.options.getString('title'));
    await interaction.reply({
      content: 'Creating card... this may take a while.',
    });
    await this.createCard({
      title,
      project,
      type: item,
      interaction,
    });
  }

  async modalHandler(interaction: ModalSubmitInteraction) {
    const title = interaction.fields.getTextInputValue(
      'azure_work_item_creation_title',
    );
    const description = interaction.fields.getTextInputValue(
      'azure_work_item_creation_description',
    );
    const project = interaction.fields.getTextInputValue(
      'azure_work_item_creation_project',
    );
    const type = interaction.fields.getTextInputValue(
      'azure_work_item_creation_type',
    );
    await interaction.reply({
      content: 'Creating card... this may take a while.',
    });
    await this.createCard({
      title,
      project,
      type,
      description,
      interaction,
    });
  }

  async createCard(payload: {
    project: string;
    type: string;
    title: string;
    interaction: any;
    description?: string;
  }) {
    const wiClient = await azure.getWorkItemTrackingApi();

    await wiClient
      .createWorkItem(
        undefined,
        [
          {
            op: 'add',
            path: '/fields/System.Title',
            value: payload.title,
          },
          {
            op: 'add',
            path: '/fields/System.Description',
            value: `<div>${payload.description}</div>`,
          },
          {
            op: 'add',
            path: '/fields/System.TeamProject',
            value: payload.project,
          },
          {
            op: 'add',
            path: '/fields/System.WorkItemType',
            value: payload.type,
          },
          {
            op: 'add',
            path: '/fields/Microsoft.VSTS.Common.Priority',
            value: '1',
          },
          {
            op: 'add',
            path: '/fields/Custom.Projeto',
            value: 'Koda.dev',
          },
        ],
        payload.project,
        payload.type,
      )
      .then(async workItem => {
        const WorkItemIcon = await wiClient
          .getWorkItemTypeColorAndIcons([payload.project])
          .then(async data => {
            const type = data[0].value.find(
              icon => icon.workItemTypeName === payload.type,
            );
            const icon = await (
              await wiClient.getWorkItemIconJson(String(type?.icon))
            ).url;

            return {
              ...type,
              icon,
            };
          });

        const embed = new EmbedBuilder()
          .setTitle(`Card Created: #${workItem.id}`)
          .setColor(
            (String(WorkItemIcon.color) as unknown as ColorResolvable) ||
              Colors.Aqua,
          )
          .addFields([
            {
              name: 'title',
              value: `[${payload.title}](${workItem._links.html.href || '#'})`,
            },
          ])
          .setAuthor({
            name: '<Kuuhaku />',
            iconURL:
              'https://rodcordeiro.github.io/shares/img/shiro_nogamenolife.jpg',
          })
          .setThumbnail(
            WorkItemIcon.icon ||
              'https://rodcordeiro.github.io/shares/img/product_backlog_item.png',
          );
        await payload.interaction.editReply({
          embeds: [embed],
          content: 'Card created!',
        });
      })
      .catch(async err => {
        console.error('err', err);
        await payload.interaction.editReply({
          content:
            'Some issues ocurred while creating the card. Please try again later.',
        });
      });
  }
}
