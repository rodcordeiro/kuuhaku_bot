import {config as env} from "dotenv"
env()

export const config = {
  TOKEN: process.env.TOKEN,
  APP_ID: process.env.clientId,
  GUILD_ID: process.env.guildId
}

