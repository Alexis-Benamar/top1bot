const { Message } = require('discord.js')
const db = require('./connection')

module.exports = {
  /**
   * @param {'channel' | 'user'} target
   * @param {Message} message
   */
  async checkIfExists(target, message) {
    const [checkChannel] =
      await db('channels')
        .where('channel_id', message.channel.id)
        .andWhere('discord_id', message.guild.id)

    // TODO: check user
    return checkChannel !== undefined
  },
  async registerChannel(channel) {
    const [registeredChannel] = await db('channels').insert(channel).returning('*')

    return registeredChannel
  }
}