import { config } from '../../common/config';
import { getPersonalAccessTokenHandler, WebApi } from 'azure-devops-node-api';

const authHandler = getPersonalAccessTokenHandler(config.azure.PAT);
export const azure = new WebApi(config.azure.ORG, authHandler);

export function getAzureConnection(payload: { PAT: string; ORG: string }) {
  const authHandler = getPersonalAccessTokenHandler(payload.PAT);
  return new WebApi(`https://dev.azure.com/${payload.ORG}`, authHandler);
}
