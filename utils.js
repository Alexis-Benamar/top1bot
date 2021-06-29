const { Channel, Message } = require('discord.js')
const queries = require('./db/queries')

/**
 * @param {Channel} channel
 */
async function channelExists(channel) {
  const exists = await queries.channel.checkIfExists(channel)

  return exists
}


/**
 * @param {Channel} channel,
 * @param {function} callback,
 */
function checkChannelAndRun(channel, callback) {
  channelExists(channel).then(exists => {
    if (!exists) return

    callback()
  })
}

/**
 * @param {Message} message
 */
function ignoreMessage(message) {
  return message.author.bot || !message.content.startsWith('!top1 ')
}

/**
 * @param {String} id
 */
function isAdmin(id) {
  return id === process.env.ADMIN_ID
}

module.exports = {
  channelExists,
  checkChannelAndRun,
  ignoreMessage,
  isAdmin,
}