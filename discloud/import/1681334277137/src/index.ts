import { config } from './common/config/app.config';


import { client } from './core/client'
import "./commands"
import "./core/events"

client.login(config.TOKEN)
// console.log({ config })