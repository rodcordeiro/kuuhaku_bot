import { Events } from "discord.js"

import { client } from "../client"

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;


  
    
});