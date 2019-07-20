const discord = require('discord.js');
const config = require('../config/config.json')

module.exports.run = (Client, msg, args) => {
    let color = config.color;
    let footer = config.footer;
    const help = new discord.RichEmbed()
    .setAuthor('TitanForgedMC Help menu')
    .addField("General Comamnds", "**help** - Opens this menu\n**ping** - Pong!\n**report [user] <reason>** - Report someone on the server.\n**status** - Shows the server status\n**xp <user>** - Shows your or the specified user's XP\n**suggest [suggestion]** - Suggest a feature that we should add\n**flip** - Flips a coin\n**link** - Link your minecraft account with your discord account")
    .addField("Music Commands", "**play [link or search query]** - Play a song\n**skip** - Skips the current song\n**stop** - Stops playing music\n**volume <0.1 to 5>** - Shows the volume or sets it\n**queue** - Shows the current queue\n**np** - Shows what song is being played\n**pause** - Pause the song currently being played\n**resume** - Resume the current song")
    .addField("Support Commands", "**new** - Opens a new support ticket\n**close** - Close the support ticket")
    .addField("Notification commands", "**sub** - Recieve notifications about all the news and important announcements\n**unsub** - Stop receiving all announcements and news")
    .addField("Admin Commands", "**kick [user] [reason]** - Kick someone from the server\n**ban [user] [reason]** - Ban someone from the server")
    .setColor(color)
    .setFooter(footer);
    msg.channel.send(help);
}

module.exports.help = {
    name: "help"
}