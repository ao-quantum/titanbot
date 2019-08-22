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
    let color = config.color;
    let footer = config.footer;

    say = args.join(" ")
    const embed = new discord.RichEmbed()
    .setTitle(say)
    .setColor(color);
    msg.delete()
    msg.channel.send(embed)
}

module.exports.help = {
    name: "say"
}