import { config as env } from 'dotenv';
env();

export const config = {
  PAT: process.env.AZURE_PAT,
  ORG: 'https://dev.azure.com/kodadev',
  QUERY_ID: process.env.QUERY_ID,
};
