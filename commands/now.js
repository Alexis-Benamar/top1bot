const { Message } = require('discord.js')
const queries = require('../db/queries')
const { checkChannelAndRun } = require('../utils.js')

/**
 * @param {Message} message
 */
const now = async (message) => {
  const { author, channel, guild } = message

  checkChannelAndRun(channel, () => {
    queries.top1.record({
      user_id: author.id,
      user_name: author.username,
      channel_id: channel.id,
      channel_name: channel.name,
      discord_id: guild.id,
      discord_name: guild.name,
      created_at: new Date(),
    }).then(() => {
      message.react('✅')
    }).catch(e => {
      console.log(e)
      message.react('⚠❌')
    })
  })
}

module.exports = {
  now
}