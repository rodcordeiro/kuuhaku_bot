import { GuildRepository } from "../database/repositories/guild.repository";

export class GuildServices {
  static async CreateOrUpdate(payload: { id: string }) {
    const guild = await GuildRepository.findOneBy({ guildId: payload.id });
    if (!guild) {
      const newGuild = GuildRepository.create({
        guildId: payload.id,
      });
      return await GuildRepository.save(newGuild);
    }
    return guild;
  }
  static async Delete(payload: { id: string }) {
    const guild = await GuildRepository.findOneBy({ guildId: payload.id });
    if (guild) await GuildRepository.delete({ guildId: payload.id });
  }
}
