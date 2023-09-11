import { Events } from "discord.js";
import { GuildServices } from '../../services/guild.service'

import { client } from "../discord/client.discord";
client.on(Events.MessageCreate, async (message) => {
  if (!message.guildId || message.interaction?.commandName) return;
  const guild = await GuildServices.CreateOrUpdate({ id: message.guildId })
});
client.on(Events.MessageUpdate, async (message) => {
  if (!message.guildId || message.interaction?.commandName) return;
  // console.log("guild_message::update", message);
});
