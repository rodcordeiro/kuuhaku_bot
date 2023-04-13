import { Collection } from "discord.js";
import fs from "fs";
import { client } from "../core/client";
import { RegisterCommands } from "./register";
import { BaseCommand } from "../common/commands/base.command";

(async () => {
  client.commands = new Collection();
  const commandsDir = fs
    .readdirSync("src/commands")
    .filter((command) => !command.endsWith(".ts") && !command.endsWith(".js"));

  const commands = await Promise.all(
    commandsDir.map(async (commandDir) => {
      const command: BaseCommand = await import(`./${commandDir}`).then(
        (module) => new module.default()
      );
      return command;
    })
  );
  commands.map((command) => {
    client.commands.set(command.data.name, command);
  });
  RegisterCommands();
})();
