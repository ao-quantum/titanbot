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

module.exports.run = (Client, msg, args, con) => {
    const color = config.color;
    const footer = config.footer;
    con.query(`SELECT * FROM titanbot_warns WHERE id = '${msg.author.id}'`, (err, rows) => {
        let target = msg.mentions.users.first() || msg.author;
        if (target) {
            if (!msg.member.hasPermission("MANAGE_SERVER")) {
                const embed = new discord.RichEmbed()
                .setAuthor('❌ You are not allowed to view other people\'s warnings')
                .setColor(color)
                .setFooter(footer);
                return msg.channel.send(embed)
            }
        }
        if (rows.length < 1) {
            if (err) throw err;
            let url = msg.author.avatarURL
            const nowarns = new discord.RichEmbed()
                .setAuthor(`Warnings for ${target}`, url)
                .setDescription(`✅ User has no warnings`)
                .setColor(color)
                .setFooter(footer);
            msg.channel.send(nowarns)
        } else {
            if (err) throw err;
            let url = msg.author.avatarURL;
            const warns = rows[0].warns;
            const warnembed = new discord.RichEmbed()
                .setAuthor(`Warnings for ${target}`, url)
                .setDescription(`⚠ User has ${warns} warning(s)`)
                .setColor(color)
                .setFooter(footer);
            msg.channel.send(warnembed);
        };
    });
}

module.exports.help = {
    name: "warns"
}