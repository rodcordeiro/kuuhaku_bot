import { Client, GatewayIntentBits } from 'discord.js'

export const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, 8, GatewayIntentBits.MessageContent] });
// export const client = new Client({ intents: [8] });
