const { Author, Channel } = require('discord.js')
const db = require('./connection')

module.exports = {
  channel: {
    /**
     * @param {Channel} channel
     */
    async checkIfExists(channel) {
      const [checkChannel] =
        await db('channels')
          .where('channel_id', channel.id)

      return checkChannel !== undefined
    },
    async getWhitelist() {
      const channels =
        await db('channels')

      return channels
    },
    /**
     * @param newChannel
     */
    async register(newChannel) {
      const [id] = await db('channels').insert(newChannel).returning('id')

      return id
    },
  },
  top1: {
    /**
     * @param {Author} author
     */
    async getLast(author) {
      const [lastTop1] =
        await db('top1')
          .where('user_id', author.id)
          .orderBy('created_at', 'desc')
          .limit(1)

      return lastTop1
    },
    /**
     * @param {NewTop1} top1
     */
    async record(top1) {
      const [id] = await db('top1').insert(top1).returning('id')

      return id
    },
  },
}