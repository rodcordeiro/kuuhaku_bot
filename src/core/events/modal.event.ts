/* eslint-disable @typescript-eslint/ban-ts-comment  */
import { Events } from "discord.js";

import { client } from "../discord/client.discord";

// @ts-ignore
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isModalSubmit()) return;

  const handler = client.modalHandlers?.find(handler=>handler.modal=== interaction.customId);
  console.log(handler,client.modalHandlers)
   if(!handler ||!handler.command){
   return await interaction.reply('Modal handler not implemented.')
   }
   const command =client.commands.get(handler.command)
if(!command.modalHandler){
   return await interaction.reply('Modal handler not implemented.')
   }
  
  await command.modalHandler(interaction);
});
