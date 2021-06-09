function ignoreMessage(message) {   
  return message.channel.id !== process.env.CHANNEL_ID ||
  !message.content.startsWith('!top1 ')
}

export {
  ignoreMessage
}