const discord = require('discord.js')

module.exports.run = async (Client, msg, args) => {
    msg.channel.send(`Pong! \`${Client.ping}\`ms`);
}

module.exports.help = {
    name: "ping"
}