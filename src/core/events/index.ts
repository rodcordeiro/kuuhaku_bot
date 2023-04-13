import { Events } from "discord.js";

import { client } from "../client";

import "./commands.event";
import "./autoComplete.event";
import "./guildMessage.event";
import "./privateMessage.event";

client.once(Events.ClientReady, (instance) => {
  console.log(`Instance Ready! Bot ${instance.user.tag} initialized.`);
});
