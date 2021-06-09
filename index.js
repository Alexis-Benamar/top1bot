import Discord from "discord.js"
import dotenv from 'dotenv'

import { ignoreMessage } from './utils.js'

dotenv.config()

const client = new Discord.Client()
const coolingDown = new Set()
// TODO : prevent users from registering a top1 within 15 minutes
const top1CoolDown = new Set() 

client.login(process.env.DISCORD_TOKEN)
client.once('ready', () => {
  console.log('henlo')
})

client.on('message', message => {
  const { author, content } = message

  // Ignore unnecessary messages
  if (ignoreMessage(message)) return
  if (coolingDown.has(author.id)) return
  
  // Add message author to coolingDown
  coolingDown.add(author.id);
  setTimeout(() => {
    coolingDown.delete(author.id);
  }, 2500);

  const command = content.split(' ')[1]
  
  console.log({ command })
})

