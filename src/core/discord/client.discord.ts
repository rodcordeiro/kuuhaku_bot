import { Client, GatewayIntentBits, Partials } from "discord.js";

export const client: {
  commands?: any;
  modalHandlers?: [
    {
      /** Modal identifier */
      modal: string;
      /** Command name. Used to identify modal command handler */
      command: string;
    }
  ];
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
