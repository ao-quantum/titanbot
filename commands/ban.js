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
    if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("❌ You do not have permissions to do that!");
    //variables
    const usertoban = msg.mentions.users.first(); // bad guy variable
    const reason = args.join(" ").slice(22)

    //embeds
    const bansucceed = new discord.RichEmbed()
        .addField("✅ User Successfully Banned!", `${usertoban} has been banned successfully!`)
        .setColor(color)
        .setFooter(footer);
    const banfail1 = new discord.RichEmbed()
        .addField("❌ User Failed to ban!", `Possibly because I do not have enough permissions to ban them`)
        .setColor(color)
        .setFooter(footer);
    const banfail2 = new discord.RichEmbed()
        .addField("❌ User Failed to ban!", `The user was not found in this guild!`)
        .setColor(color)
        .setFooter(footer);
    const banfail3 = new discord.RichEmbed()
        .addField("❌ User Failed to ban!", `You didn't mention the user to kick!`)
        .setColor(color)
        .setFooter(footer);

    if (usertoban) {
        const member = msg.guild.member(usertoban); // check if user is in guild
        if (!reason) return msg.channel.send("Please specify a reason")
        if (member) { // kick the user
            member.ban(`${member} banned ${usertoban} for ${reason}`).then(() => {
                msg.channel.send(bansucceed);
            }).catch(err => { // unable to kick user
                msg.channel.send(banfail1)
                console.log(err);
            });
        } else { // user not in guild
            msg.channel.send(banfail2);
        }
    } else { // user not mentioned
        msg.channel.send(banfail3);
    };
}

module.exports.help = {
    name: "ban"
}
