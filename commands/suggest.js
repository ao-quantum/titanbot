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
    const suggestion = args.join(" ");
    if (!suggestion) return msg.channel.send("You have not suggested anything. Please put your suggestion after `-suggest`")

    const user = msg.author;

    const Thanks = new discord.RichEmbed()
        .setTitle("✅ Thank you for your suggestion!")
        .setDescription("Thank you for your suggestion, our staff will now look into the suggestion and think whether it should be added or not")
        .setColor(color)
        .setFooter(footer);

    msg.channel.send(Thanks);

    const suggestionembed = new discord.RichEmbed()
        .setAuthor(`New suggestion from ${user.username}`, user.avatarURL)
        .setColor(color)
        .setFooter(footer);
    const suggestionwebhook = new discord.WebhookClient("webhook_id", "webhook_token");
    suggestionwebhook.send(suggestionembed);
}

module.exports.help = {
    name: "suggest"
}