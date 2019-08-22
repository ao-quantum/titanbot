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

module.exports.run = (Client, msg, args) => {
    let color = config.color;
    let footer = config.footer;
    function generateNum() {
        max = 10
        min = 1

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // this uses the value of generateXP function to get a random number, that random number judges the heads of tails
    const num = generateNum();
    let result
    if (num <= 5) {
        result = "Heads";
    } else if (num >= 6) {
        result = "Tails";
    };

    const flipembed = new discord.RichEmbed()
        .setTitle(`${result}`)
        .setColor(color);
    msg.channel.send(flipembed)
}

module.exports.help = {
    name: "flip"
}
