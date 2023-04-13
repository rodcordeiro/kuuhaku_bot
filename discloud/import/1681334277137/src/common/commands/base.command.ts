import { SlashCommandBuilder } from "discord.js";

export type BaseCommand = {
  data: SlashCommandBuilder;
  execute: () => Promise<void>;
};
