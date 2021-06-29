const { Message } = require('discord.js')
const queries = require('../db/queries')

module.exports = {
  name: 'last',
  description: 'Get last top1 from message author',
  /**
   * @param {Message} message
   * @param {string[]} args
   */
  async execute(message, args) {
    const { author, channel } = message

    // TODO: stats with args

    const lastTop1 = await queries.top1.getLast(author)

    if (!lastTop1) {
      channel.send(`Pas encore de top 1 enregistrés pour <@${author.id}> 😔`)
    } else {
      channel.send(`Dernier top 1 pour <@${author.id}>:\n${lastTop1.created_at.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}`)
    }
  }
}