/***********************************************
*
*                 Titan Bot
*
*          Made by Quantonium#6562
*        © 2019 Aditya "Quantum" Das
*
************************************************/
const discord = require('discord.js');
const config = require('../config/config.json')

module.exports.run = (Client, msg, args, con) => {
    let color = config.color;
    let footer = config.footer;
    let target = msg.mentions.users.first() || msg.author;

    con.query(`SELECT * FROM titanbot_xp WHERE id = '${target.id}'`, (err, rows) => {
        if (err) throw err;
        if (!rows[0]) return msg.channel.send('❌ That user does not have any XP or is not in this server')

        const xp = rows[0].xp

        if (target === msg.author) {
            const yourxp = new discord.RichEmbed()
            .setAuthor(`You have ${xp}xp`, target.avatarURL)
            .setColor(color)
            .setFooter(footer);
            msg.channel.send(yourxp)
        } else if (target === msg.mentions.users.first()) {
            const targetxp = new discord.RichEmbed()
            .setAuthor(`${target.username} has ${xp}xp`, target.avatarURL)
            .setColor(color)
            .setFooter(footer);
            msg.channel.send(targetxp)
        } else if (!xp) {
            const embed = new discord.RichEmbed()
            .setAuthor('That user either has no xp or does not exist in this server!')
            .setColor(color)
            .setFooter(footer);
            msg.channel.send(embed);
        }
    });
}

module.exports.help = {
    name: "xp"
}