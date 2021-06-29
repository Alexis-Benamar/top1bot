const { Message } = require('discord.js')
const { readFile } = require('fs')

module.exports = {
  name: 'help',
  description: 'Displays list of commands',
  /**
   * @param {Message} message
   */
  async execute(message) {
    const { channel } = message

    readFile('./DOCS.md', 'utf8', (err, data) => {
      if (err) {
        console.log(err)

        return
      }

      channel.send({ embed: {
        description: `${data}`
      }})
    })
  }
}