import { config } from "../../common/config";
import { getPersonalAccessTokenHandler, WebApi } from "azure-devops-node-api";

const authHandler = getPersonalAccessTokenHandler(config.azure.PAT);
export const azure = new WebApi(config.azure.ORG, authHandler);

export function getAzureConnection (payload:{PAT:string,ORG:string}){
  const authHandler = getPersonalAccessTokenHandler(config.azure.PAT);
  return new WebApi(config.azure.ORG, authHandler);  
}
