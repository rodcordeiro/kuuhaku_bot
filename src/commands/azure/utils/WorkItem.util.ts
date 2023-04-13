import { WorkItem } from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";

export type IWorkItemModel = {
  title: string;
  id: number;
  project: string;
  subproject?: string;
  url: string;
};
export class WorkItemModel {
  static assing(card: WorkItem): IWorkItemModel {
    return {
      title: card.fields?.["System.Title"],
      id: Number(card.id),
      project: card.fields?.["System.TeamProject"],
      subproject: card.fields?.["Custom.Projeto"],
      url: card._links ? card._links.html.href : "#",
    };
  }
}
