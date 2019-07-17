const discord = require('discord.js')
const config = require('../config/config.json')

module.exports.run = (Client, msg, args) => {
    let color = config.color;
    let footer = config.footer;
    const reason = msg.content.split(" ").slice(1).join(" ");
    const usernm = `${msg.author.username}`
    if (!msg.guild.roles.exists("name", "Support Team")) return msg.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
    if (msg.guild.channels.exists("name", `ticket-` + usernm)) return msg.channel.send(`You already have a ticket open.`);
    msg.guild.createChannel(`ticket-${msg.author.tag}`, {type: "channel"}).then(c => {
        let role = msg.guild.roles.find("name", "Support Team");
        let role2 = msg.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(msg.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });

        const ticketmadeembed = new discord.RichEmbed()
            .addField("✅ Ticket created!", `Your Ticket has been created! Your ticket is #${c.name}`)
            .setColor(color)
            .setFooter(footer);
        msg.channel.send(ticketmadeembed);
        const embed = new discord.RichEmbed()
            .setColor(color)
            .addField(`Hey ${msg.author.username}!`, `Please try explain why you opened this ticket with as much detail as possible. Our **Support Team** will be here soon to help.`)
            .setFooter(footer)
        c.send({
            embed: embed
        });
    }).catch(console.error);
}

module.exports.help = {
    name: "new"
}
