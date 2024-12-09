import { config as env } from 'dotenv';
env();

export const config = {
  TOKEN: process.env.DEV_TOKEN || process.env.TOKEN,
  APP_ID: process.env.DEV_APP_ID || process.env.APP_ID,
};
