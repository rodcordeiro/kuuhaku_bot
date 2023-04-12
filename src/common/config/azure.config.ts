import { config as env } from "dotenv";
env();

export const config = {
  PAT: process.env.AZURE_PAT
}