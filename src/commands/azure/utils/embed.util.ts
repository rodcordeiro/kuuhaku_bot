import { EmbedBuilder, Colors, APIEmbedField } from "discord.js";
import { IWorkItemModel } from "./WorkItem.util";

const groupCards = (project: string, cards: IWorkItemModel[]) => {
  const fields: APIEmbedField[] = [];

  cards.map((card) =>
    fields.push({
      name: `#${card.id}`,
      value: `[${
        card.title.length > 40 ? `${card.title.slice(0, 40)}...` : card.title
      }](${card.url})`,
    }),
  );
  return fields;
};

const cardsPerProject = (
  project: string,
  cards: IWorkItemModel[],
): APIEmbedField[] => {
  const workitems = cards.filter((value) => value.project === project);
  return groupCards(project, workitems);
};

export const EmbedCards = (cards: IWorkItemModel[]) => {
  const projects = cards
    .map((c) => c.project)
    .filter((value, index, arr) => arr.indexOf(value) === index);

  const embeds = projects.map((project, index, arr) => {
    const embed = new EmbedBuilder()
      .setColor(Colors.DarkGreen)
      .setTitle(`Open cards at ${project} project`)
      .setAuthor({
        name: "<Kuuhaku />",
        iconURL:
          "https://rodcordeiro.github.io/shares/img/shiro_nogamenolife.jpg",
      })
      .setThumbnail(
        "https://rodcordeiro.github.io/shares/img/product_backlog_item.png",
      )
      .addFields(cardsPerProject(project, cards))
      .addFields({ name: "\u200B", value: "\u200B" });
    if (index === arr.length - 1) {
      embed.setFooter({
        text: "To update the result. Alter the query on koda project!",
        iconURL:
          "https://rodcordeiro.github.io/shares/img/shiro_nogamenolife.jpg",
      });
    }
    return embed;
  });

  return embeds;
};
