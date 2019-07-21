const discord = require('discord.js');
const config = require('../config/config.json')
const mysql = require('mysql')

const con = mysql.createConnection({
    host: "na-sql.pebblehost.com",
    database: "customer_77991",
    user: "customer_77991",
    password: "7987273d7e",
    charset: "utf8mb4_unicode_ci"
});
con.connect(err => {
    if (err) throw err;
});

module.exports.run = (Client, msg, args) => {
    let color = config.color;
    let footer = config.footer;
    let target = msg.mentions.users.first() || msg.author;

    con.query(`SELECT * FROM titanbot_xp WHERE id = '${target.id}'`, (err, rows) => {
        if (err) throw err;
        let xp = rows[0].xp;

        const yourxp = new discord.RichEmbed()
            .setAuthor(`You have \`${xp}\`xp`, target.avatarURL)
            .setColor(color)
            .setFooter(footer);

        const targetxp = new discord.RichEmbed()
            .setAuthor(`${target.username} has \`${xp}\`xp`, target.avatarURL)
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