const discord = require('discord.js')
const config = require('../config/config.json')

module.exports.run = async (Client, msg, args) => {
    const suggestion = args.join(" ");
    if (!suggestion) return msg.channel.send("You have not suggested anything. Please put your suggestion after `-suggest`")

    const user = msg.author;

    let suggestionid = Client.channels.get(config.suggestionchannelid);

    const Thanks = new discord.RichEmbed()
        .setTitle("✅ Thank you for your suggestion!")
        .setDescription("Thank you for your suggestion, our staff will now look into the suggestion and think whether it should be added or not")
        .setColor(color)
        .setFooter(footer);

    msg.channel.send(Thanks);

    const suggestionembed = new discord.RichEmbed()
        .addField(`New suggestion from ${user.username}`, `${suggestion}`)
        .setColor(color)
        .setFooter(footer);
    suggestionid.send(suggestionembed);
}

module.exports.help = {
    name: "suggest"
}