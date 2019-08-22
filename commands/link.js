/***********************************************
*
*                 Titan Bot
*
*          Made by Quantonium#6562
*        © 2019 Aditya "Quantum" Das
*
************************************************/
const discord = require('discord.js')
const config = require('../config/config.json')

module.exports.run = async (Client, msg, args) => {
    const color = config.color;
    const footer = config.footer;
    const linkembed = new discord.RichEmbed()
        .setTitle(`To link your discord account with your minecraft account, please execute "/link" in game and DM me the code`)
        .setColor(color)
        .setFooter(footer);
    msg.channel.send(linkembed);
}

module.exports.help = {
    name: "link"
}
