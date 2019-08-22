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
    const reason = args.join(" ").slice(22)

    const member = msg.mentions.users.first();
    const author = msg.author;

    const channel = Client.channels.get(config.reportchannel); // Channel ID
    if (!channel) return; // If its not a channel, stop

    if (!member) { // if member not found
        msg.channel.send('Invalid user or the user is not found! Make sure you mention the user!') // let user know of error
        return; // stop
    }

    msg.channel.send(`${member} has been reported! Thank you for letting us know!`);

    // EMBED FOR THE REPORT LOGGING

    const reportembed = new discord.RichEmbed()
        .setTitle('New Report!')
        .setDescription(`${author} has reported ${member} for "${reason}"`)
        .setColor(color)
        .setFooter(footer);

    // SEND THE REPORT TO LOGS

    channel.send(reportembed);
}

module.exports.help = {
    name: "report"
}
