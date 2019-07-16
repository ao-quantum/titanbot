const discord = require('discord.js')
const config = require('../config/config.json')

module.exports.run = (Client, msg, args) => {
    let color = config.color;
    let footer = config.footer;
    if (!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send("❌ You do not have permissions to do that!");
    //variables
    const usertokick = msg.mentions.users.first();
    const reason = args.join(" ").slice(22)

    //embeds
    const kicksucceeded = new discord.RichEmbed()
        .addField("✅ User Successfully Kicked!", `${usertokick} has been kicked successfully!`)
        .setColor(color)
        .setFooter(footer);
    const kickfail1 = new discord.RichEmbed()
        .addField("❌ User Failed to Kick!", `Possibly because I do not have enough permissions to ban them`)
        .setColor(color)
        .setFooter(footer);
    const kickfail2 = new discord.RichEmbed()
        .addField("❌ User Failed to Kick!", `The user was not found in this guild!`)
        .setColor(color)
        .setFooter(footer);
    const kickfail3 = new discord.RichEmbed()
        .addField("❌ User Failed to Kick!", `You didn't mention the user to kick!`)
        .setColor(color)
        .setFooter(footer);

    if (usertokick) {
        const member = msg.guild.member(usertokick); // check is user is in guild
        if (!reason) return msg.channel.send("Please specify a reason");
        if (member) { // kick the user
            member.kick(`${member} kicked ${usertokick} for ${reason}`).then(() => {
                msg.channel.send(kicksucceeded);
            }).catch(err => { // unable to kick user
                msg.channel.send(kickfail1)
                console.log(err);
            });
        } else { // user not in guild
            msg.channel.send(kickfail2);
        }
    } else { // user not mentioned
        msg.channel.send(kickfail3);
    };
}

module.exports.help = {
    name: "kick"
}
