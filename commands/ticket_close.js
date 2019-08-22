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
    const error = new discord.RichEmbed()
        .addField(`Error!`, `You cannot use this command outside a ticket channel`)
        .setColor(color)
        .setFooter(footer);
    if (!msg.channel.name.startsWith(`ticket-`)) return msg.channel.send(error);

    const closeconfirm = new discord.RichEmbed()
        .addField(`Warning! Are you sure you want to continue with that action?`, `This action is irreversible.\nTo confirm, type \`-confirm\`. This request will time out in 20 seconds.`)
        .setColor(color)
        .setFooter(footer);
    msg.channel.send(closeconfirm)
        .then((m) => {
            msg.channel.awaitMessages(response => response.content === '-confirm', {
                    max: 1,
                    time: 20000,
                    errors: ['time'],
                })
                .then((collected) => {
                    msg.channel.delete()
                    const cdeletesuccessdm = new discord.RichEmbed()
                        .addField(`Hey there, ${msg.author.username}`, `Thanks for contacting TitanForgedMC support.\nIf you have any further enquiries or need further help, please feel free to open another ticket!\nWe hope you have a good day!`)
                        .setColor(color)
                        .setFooter(footer);
                    msg.author.send(cdeletesuccessdm);
                })
                .catch(() => {
                    const notclosed = new discord.RichEmbed()
                        .setTitle(`Close request timed out. Ticket not closed`)
                        .setColor(color)
                        .setFooter(footer);
                    m.edit(notclosed).then(m2 => {
                        m2.delete();
                    }, 3000);
                });
        });
}

module.exports.help = {
    name: "close"
}