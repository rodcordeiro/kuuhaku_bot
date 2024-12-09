/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { ModalHandlerIdentifier } from 'src/common/interfaces/modalHandler.interface';

export const client: {
  commands?: any;
  modalHandlers?: ModalHandlerIdentifier[];
} & Client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    8,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel, Partials.Message],
});
