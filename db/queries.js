const db = require('./connection')

module.exports = {
  /**
   * @param {Chanel} message
   */
  async checkIfExists(channel) {
    const [checkChannel] =
      await db('channels')
        .where('channel_id', channel.id)

    return checkChannel !== undefined
  },
  async registerChannel(channel) {
    const [id] = await db('channels').insert(channel).returning('id')

    return id
  },
  async recordTop1(top1) {
    const [id] = await db('top1').insert(top1).returning('id')

    return id
  }
}