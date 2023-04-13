import { Events } from "discord.js";

import { client } from "../client";

client.on(Events.MessageCreate, async (message) => {
  if (!message.guildId || message.interaction?.commandName) return;
  console.log("guild_message::create", message);
});
client.on(Events.MessageUpdate, async (message) => {
  if (!message.guildId || message.interaction?.commandName) return;
  console.log("guild_message::update", message);
});
