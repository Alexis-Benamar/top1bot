function ignoreMessage(message) {
  // return message.channel.id !== process.env.CHANNEL_ID ||
  return !message.content.startsWith('!top1 ')
}

module.exports = {
  ignoreMessage
}