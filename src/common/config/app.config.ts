import { config as env } from "dotenv";
env();

export const config = {
  TOKEN: process.env.TOKEN,
  APP_ID: process.env.APP_ID,
  GUILD_ID: process.env.GUILD_ID,
};
