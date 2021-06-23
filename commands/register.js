const { Message } = require('discord.js')
const queries = require('../db/queries')
const { channelExists } = require('../utils.js')

/**
 * Handles 'register' commands
 * @param {Message} message
 */
const register = async (message) => {
  const { channel, guild } = message

  const exists = await channelExists(channel)

  if (exists) {
    channel.send(`Le channel <#${channel.id}> du serveur **${guild.name}** est déjà enregistré`)
  } else {
    queries.channel.register({
      channel_id: channel.id,
      name: channel.name,
      discord_id: guild.id,
      discord_name: guild.name,
      created_at: new Date()
    }).then(() => {
      channel.send(`Channel <#${channel.id}> enregistré ✅`)
    }).catch(e => {
      console.log(e)
      message.react('⚠❌')
    })
  }
}

module.exports = {
  register
}