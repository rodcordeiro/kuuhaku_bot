import { EmbedBuilder, Colors, APIEmbedField } from "discord.js";
import { IWorkItemModel } from "./WorkItem.util";

const cardFormatter = (card: IWorkItemModel): string =>
  `[#${card.id}: ${card.title}](${card.url})`;
const groupCards = (project: string, cards: string[]) => {
  const fields: APIEmbedField[] = [];
  while (cards.length > 10) {
    fields.push({
      name: project,
      value: cards.splice(0, 10).join("\n"),
    });
  }
  fields.push({
    name: project,
    value: cards.join("\n"),
  });
  return fields;
};
const cardsPerProject = (
  project: string,
  cards: IWorkItemModel[]
): APIEmbedField[] => {
  const workitems = cards
    .filter((value) => value.project === project)
    .map((card) => cardFormatter(card));
  return groupCards(project, workitems);
};
export const EmbedCards = (cards: IWorkItemModel[]) => {
  const projects = cards
    .map((c) => c.project)
    .filter((value, index, arr) => arr.indexOf(value) === index);

  const fields = projects.map((project) => cardsPerProject(project, cards));

  console.log(fields, fields.length);
  const embed = new EmbedBuilder()
    .setColor(Colors.DarkGreen)
    .setTitle("Here are the pending cards on Azure Devops")
    .setThumbnail("https://cdn.vsassets.io/content/icons/favicon.ico")
    .addFields(fields.flat(1));
  return embed;
};
