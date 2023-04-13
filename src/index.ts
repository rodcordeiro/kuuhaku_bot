import { config } from "./common/config/app.config";

import { client } from "./core/client";
import "./commands";
import "./core/events";
import { ActivityType } from "discord.js";

client.login(config.TOKEN).then(() => {
  setInterval(() => {
    const timer = setTimeout(() => {
      client.user?.setActivity("with some goblins...");
      clearTimeout(timer);
    }, 2 * (60 * 1000));
    client.user?.setPresence({
      status: "online",
      activities: [
        {
          name: "/help",
          type: ActivityType.Listening,
        },
      ],
    });
  }, 10 * (60 * 1000));
});
