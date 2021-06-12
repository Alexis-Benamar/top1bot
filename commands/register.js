const { Message } = require('discord.js')
const queries = require('../db/queries')

/**
 * Handles 'register' commands
 * @param {Message} message
 */
const register = async (message) => {
  const { channel, guild } = message

  const exists = await queries.checkIfExists(channel)

  if (exists) {
    message.react('🔁')
  } else {
    queries.registerChannel({
      channel_id: channel.id,
      name: channel.name,
      discord_id: guild.id,
      discord_name: guild.name,
      created_at: new Date()
    }).then(() => {
      message.react('✅')
    }).catch(e => {
      console.log(e)
      message.react('⚠❌')
    })
  }
}

module.exports = {
  register
}