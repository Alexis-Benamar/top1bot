const Discord = require('discord.js')
const dotenv = require('dotenv')

const { last } = require('./commands/last')
const { now } = require('./commands/now')
const { register } = require('./commands/register')
const { ignoreMessage } = require('./utils')

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
  const isAdmin = author.id === process.env.ADMIN_ID

  // Ignore unnecessary messages
  if (ignoreMessage(message)) return
  if (coolingDown.has(author.id)) return

  // Add message author to coolingDown
  coolingDown.add(author.id);
  setTimeout(() => {
    coolingDown.delete(author.id);
  }, 2500);

  const command = content.split(' ')

  if (command[1] === 'register' && isAdmin) register(message)
  if (command[1] === 'now') now(message)
  if (command[1] === 'last') last(message)
})
