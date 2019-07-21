const discord = require('discord.js');
const config = require('../config/config.json')

module.exports.run = (Client, msg, args, con) => {
    let color = config.color;
    let footer = config.footer;
    let target = msg.mentions.users.first() || msg.author;

    con.query(`SELECT * FROM titanbot_xp WHERE id = '${target.id}'`, (err, rows) => {
        if (err) throw err;
        let xp = rows[0].xp;

        const yourxp = new discord.RichEmbed()
            .setAuthor(`You have ${xp}xp`, target.avatarURL)
            .setColor(color)
            .setFooter(footer);

        const targetxp = new discord.RichEmbed()
            .setAuthor(`${target.username} has ${xp}xp`, target.avatarURL)
            .setColor(color)
            .setFooter(footer);

        if (target === msg.author) {
            msg.channel.send(yourxp)
        } else if (target === msg.mentions.users.first()) {
            msg.channel.send(targetxp)
        }
    });
}

module.exports.help = {
    name: "xp"
}