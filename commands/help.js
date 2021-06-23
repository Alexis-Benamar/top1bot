const { Message } = require('discord.js')
const { readFile } = require('fs')

/**
 * @param {Message} message
 */
const help = async (message) => {
  const { channel } = message

  const docsFile = readFile('./DOCS.md', 'utf8', (err, data) => {
    if (err) {
      console.log(err)

      return
    }

    channel.send({ embed: {
      description: `${data}`
    }})
  })

}

module.exports = {
  help
}