const { Message } = require('discord.js')
const queries = require('../db/queries')
const { checkChannelAndRun } = require('../utils.js')

/**
 * @param {Message} message
 */
const last = async (message) => {
  const { author, channel } = message

  checkChannelAndRun(channel, async () => {
    const lastTop1 = await queries.top1.getLast(author)

    if (!lastTop1) {
      channel.send(`Pas encore de top 1 enregistrés pour <@${author.id}> 😔`)
    } else {
      channel.send(`Dernier top 1 pour <@${author.id}>:\n${lastTop1.created_at.toLocaleString()}`)
    }
  })
}

module.exports = {
  last
}