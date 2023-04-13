declare global {
    namespace NodeJS {
      export interface ProcessEnv {
        /** Bot Token */
        readonly TOKEN: string;
        /** Application or client ID */
        readonly APP_ID: string;
        /** GUILD ID. *Needed for guild specifical commands or interactions* */
        readonly GUILD_ID: string;

        /** AZURE */
        /**  Azure Personal Acces Token */
        readonly AZURE_PAT: string;
      }
    }
  }
  
  export {};
  