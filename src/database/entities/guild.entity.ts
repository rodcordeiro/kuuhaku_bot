import { Entity, Column } from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";

@Entity({ name: "kb_tb_guild" })
export class GuildEntity extends BaseEntity {
  @Column()
  guildId: string;

  @Column()
  azureToken?: string;

  @Column()
  azureQueryId?: strint;
}
