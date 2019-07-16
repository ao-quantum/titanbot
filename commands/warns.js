const discord = require('discord.js')
const config = require('../config/config.json')
const mysql = require('mysql')

const con = mysql.createConnection({
    host: "54.39.133.237",
    database: "customer_77991",
    user: "customer_77991",
    password: "7987273d7e",
    charset: "utf8mb4_unicode_ci"
});

con.connect(err => {
    if (err) throw err;
});

module.exports.run = (Client, msg, args) => {
    const color = config.color;
    const footer = config.footer;
    con.query(`SELECT * FROM titanbot_warns WHERE id = '${msg.author.id}'`, (err, rows) => {
        if (rows.length < 1) {
            if (err) throw err;
            let url = msg.author.avatarURL
            const nowarns = new discord.RichEmbed()
                .setAuthor(`Warnings for ${msg.author.username}`, url)
                .setDescription(`✅ User has no warnings`)
                .setColor(color)
                .setFooter(footer);
            msg.channel.send(nowarns)
        } else {
            if (err) throw err;
            let url = msg.author.avatarURL
            const warns = rows[0].warns;
            const warnembed = new discord.RichEmbed()
                .setAuthor(`Warnings for ${msg.author.username}`, url)
                .setDescription(`⚠ User has ${warns} warnings`)
                .setColor(color)
                .setFooter(footer);
            msg.channel.send(warnembed);
        };
    });
}

module.exports.help = {
    name: "warns"
}