import { Client, GatewayIntentBits, Partials } from "discord.js";

export const client: { commands?: any,modalHandlers?:[{modal:string,command:any}] } & Client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    8,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel, Partials.Message],
});
