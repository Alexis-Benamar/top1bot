const { Message } = require('discord.js')
const queries = require('../db/queries')
const { channelExists, isAdmin, refreshWhitelistedChannels } = require('../utils.js')

module.exports = {
  name: 'register',
  description: 'Registers a channel to be listened',
  /**
   * @param {Message} message
   */
  async execute(message) {
    const { author, channel, guild } = message

    if (!isAdmin(author.id)) return

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
      }).then(async () => {
        channel.send(`Channel <#${channel.id}> enregistré ✅`)

        await refreshWhitelistedChannels(message.client)
      }).catch(e => {
        console.log(e)
        message.react('⚠❌')
      })
    }
  }
}