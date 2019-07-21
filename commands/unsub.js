const discord = require('discord.js')
const config = require('../config/config.json')
const mysql = require('mysql')

module.exports.run = (Client, msg, args) => {
    let color = config.color;
    let footer = config.footer;
    con.query(`SELECT * FROM titanbot_cfg`, (err, rows) => {
        if (err) throw err;
        notifyrole = rows[3].value;
        msg.member.removeRole(`${notifyrole}`)
        const roleremove = new discord.RichEmbed()
            .setTitle("✅ Removed you from notifications list")
            .setColor(color)
            .setFooter(footer);
        msg.channel.send(roleremove);
    });
}

module.exports.help = {
    name: "unsub"
}
