import { REST, Routes } from "discord.js"
import { client } from "../core/client"
import { config } from "../common/config"


const api = new REST().setToken(config.app.TOKEN)

export const RegisterCommands = async () => {
  try {
    const { commands } = client;
    const commandData = commands.map(c => {
      return c.data
    })
    await api.put(
      Routes.applicationCommands(config.app.APP_ID),
      { body: commandData },
    );
  } catch (error) {
    console.error(error);
  }
}

