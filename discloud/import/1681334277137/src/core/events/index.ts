import { Events } from "discord.js"

import { client } from "../client"

import './commands.event'
import './privateMessage.event'
import './guildMessage.event'

client.once(Events.ClientReady, instance => {
  console.log(`Instance Ready! Bot ${instance.user.tag} initialized.`)
})
