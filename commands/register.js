const { Message } = require('discord.js')
const queries = require('../db/queries')

/**
 * Handles 'register' commands
 * @param {String[]} command
 * @param {Message} message
 */
const register = (command, message) => {
  const target = command[2]

  if (target === 'channel') registerChannel(message)
  if (target === 'me') registerUser(message)
}

/**
 * Registers channel to whitelist table
 * @param {Message} message
 */
const registerChannel = (message) => {
  const { channel, guild } = message

  queries.checkIfExists('channel', message).then(exists => {
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
      }).catch(error => {
        console.log(error)
        message.react('⚠❌')
      })
    }
  })


}

// TODO: register user
const registerUser = (message) => {
  console.log('register user')
}

module.exports = {
  register
}