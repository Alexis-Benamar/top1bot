const { Message } = require('discord.js')

const { isAdmin, refreshWhitelistedChannels } = require('../utils')

module.exports = {
  name: 'refresh',
  description: 'Refreshes whitelisted channels',
  /**
   * @param {Message} message
   */
  async execute(message) {
    if (!isAdmin) return

    refreshWhitelistedChannels(message.client).then(() => {
      message.react('✅')
    })
  }
}