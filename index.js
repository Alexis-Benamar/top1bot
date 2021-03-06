const { Client, Collection } = require('discord.js')
const dotenv = require('dotenv')
const { readdirSync } = require('fs')
const { join } = require('path')

const { checkChannelAndRun, ignoreMessage, refreshWhitelistedChannels } = require('./utils')

/**
 * Setup
 */
dotenv.config()

if (process.env.NODE_ENV === 'development') {
  console.log('Running in DEVELOPMENT mode')
}

const client = new Client()
const coolingDown = new Set()

client.commands = new Collection()
client.top1Cooldowns = new Collection()
client.whitelistedChannels = new Collection()

client.login(process.env.DISCORD_TOKEN)
client.once('ready', async () => {
  console.log('henlo 🐢')

  // Get whitelisted channels on startup
  await refreshWhitelistedChannels(client)
})


/**
 * Import commands
 */
const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
  const command = require(join(__dirname, 'commands', `${file}`))
  client.commands.set(command.name, command)
}

/**
 * On message
 */
client.on('message', message => {
  const { author, channel, content } = message

  // Ignore unnecessary messages
  if (ignoreMessage(message)) return
  if (coolingDown.has(author.id)) return

  // Add message author to coolingDown
  coolingDown.add(author.id)
  setTimeout(() => {
    coolingDown.delete(author.id)
  }, 2500)

  // Slice 5 to remove '!top1' from content
  const args = content.slice(5).trim().split(' ')
  const commandName = args.shift().toLowerCase()
  const command = client.commands.get(commandName)

  if (!command) return

  try {
    checkChannelAndRun(message, commandName, () => command.execute(message, args))
  } catch (error) {
    console.error(error)
  }
})
