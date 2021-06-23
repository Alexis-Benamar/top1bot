const Discord = require('discord.js')
const dotenv = require('dotenv')

const { help } = require('./commands/help')
const { last } = require('./commands/last')
const { now } = require('./commands/now')
const { register } = require('./commands/register')
const { checkChannelAndRun, ignoreMessage } = require('./utils')

dotenv.config()

const client = new Discord.Client()
const coolingDown = new Set()
const top1Cooldown = new Set()

client.login(process.env.DISCORD_TOKEN)
client.once('ready', () => {
  console.log('henlo 🐢')
})

client.on('message', message => {
  const { author, channel, content } = message
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

  if (command[1] === 'help') help(message)
  if (command[1] === 'last') checkChannelAndRun(channel, () => last(message))
  if (command[1] === 'now') {
    checkChannelAndRun(channel, () => {
      // Ignore !top1 now within 15 minutes interval
      if (top1Cooldown.has(author.id)) return

      // Add author to top1Cooldown so he has to wait for 15 minutes
      top1Cooldown.add(author.id)
      setTimeout(() => {
        top1Cooldown.delete(author.id);
      }, 15 * 60 * 1000);

      now(message)
    })
  }
  if (command[1] === 'register' && isAdmin) register(message)
})
