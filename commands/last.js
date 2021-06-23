const { Message } = require('discord.js')
const queries = require('../db/queries')

/**
 * @param {Message} message
 */
const last = async (message) => {
  const { author, channel, guild } = message

  // TODO: get last top1 from user
}

module.exports = {
  last
}