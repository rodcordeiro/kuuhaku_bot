import { Client, GatewayIntentBits } from 'discord.js'

export const client: { commands?: any } & Client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, 8, GatewayIntentBits.MessageContent] });
