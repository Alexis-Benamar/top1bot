const { Client, Message } = require('discord.js')
const queries = require('../db/queries')

module.exports = {
  name: 'now',
  description: 'Records a top1',
  /**
   * @param {Client} client
   * @param {Message} message
   */
  async execute(message) {
    const { author, channel, client } = message

    // Ignore !top1 now within 15 minutes interval
    if (client.top1Cooldowns.has(author.id)) return

    // Add author to top1Cooldown so he has to wait for 15 minutes
    client.top1Cooldowns.set(author.id, {})
    setTimeout(() => {
      client.top1Cooldowns.delete(author.id);
    }, 15 * 60 * 1000);

    queries.top1.record({
      user_id: author.id,
      user_name: author.username,
      channel_id: channel.id,
      created_at: new Date(),
    }).then(() => {
      message.react('✅')
    }).catch(e => {
      console.log(e)
      message.react('⚠❌')
    })
  }
}