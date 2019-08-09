const discord = require('discord.js')
const config = require('../config/config.json')

module.exports.run = async (Client, msg, args) => {
    let color = config.color;
    let footer = config.footer;
    msg.channel.send(`Pong! \`${Client.ping}\`ms from quantum's pc`);
}

module.exports.help = {
    name: "ping"
}