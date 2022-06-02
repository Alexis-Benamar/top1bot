const { Channel, Client, Message } = require('discord.js')
const queries = require('./db/queries')

/**
 * @param {Channel} channel
 */
async function channelExists(channel) {
  const exists = await queries.channel.checkIfExists(channel)

  return exists
}


/**
 * @param {Message} message,
 * @param {string} commandName,
 * @param {function} callback,
 */
function checkChannelAndRun(message, commandName, callback) {
  const { whitelistedChannels } = message.client

  if (commandName !== 'register' && !whitelistedChannels.has(message.channel.id)) return

  callback()
}

/**
 * @param {Message} message
 */
function ignoreMessage(message) {
  return message.author.bot
    || !message.content.startsWith('!top1 ')
    || process.env.NODE_ENV === 'development' && message.channel.id !== process.env.TEST_CHANNEL
}

/**
 * @param {String} id
 */
function isAdmin(id) {
  return id === process.env.ADMIN_ID
}

/**
 * @param {Client} client
 */
async function refreshWhitelistedChannels(client) {
  const channels = await queries.channel.getWhitelist()

  client.whitelistedChannels.clear()
  for (const channel of channels) {
    client.whitelistedChannels.set(channel.channel_id, channel)
  }

  console.log('whitelisted channels:', client.whitelistedChannels)
}

module.exports = {
  channelExists,
  checkChannelAndRun,
  ignoreMessage,
  isAdmin,
  refreshWhitelistedChannels,
}