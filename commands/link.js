const discord = require('discord.js')

module.exports.run = async (Client, msg, args) => {
    const linkembed = new discord.RichEmbed()
    .setTitle(`To link your discord account with your minecraft account, please execute "/link" in game and DM me the code`)
    .setColor(color)
    .setFooter(footer);
    msg.channel.send(linkembed);
}

module.exports.help = {
    name: "link"
}