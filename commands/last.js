const { Message } = require('discord.js')
const queries = require('../db/queries')

/**
 * @param {Message} message
 */
const last = async (message) => {
  const { author, channel } = message

  const lastTop1 = await queries.top1.getLast(author)

  if (!lastTop1) {
    channel.send(`Pas encore de top 1 enregistrés pour <@${author.id}> 😔`)
  } else {
    channel.send(`Dernier top 1 pour <@${author.id}>:\n${lastTop1.created_at.toLocaleString()}`)
  }
}

module.exports = {
  last
}