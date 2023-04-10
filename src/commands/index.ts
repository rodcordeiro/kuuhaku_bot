
import {Collection} from "discord.js"
import {client} from "../core/client"
import {RegisterCommands}from"./register"

import PingCommand from "./ping"
import ProfileCommand from './profile'

client.commands = new Collection()
const commands =[
  new PingCommand(),
  new ProfileCommand()
]



for (const command of commands) {
   client.commands.set(command.data.name,command)
}




RegisterCommands()