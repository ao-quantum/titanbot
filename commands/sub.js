const discord = require('discord.js')
const config = require('../config/config.json')
const mysql = require('mysql')

module.exports.run = (Client, msg, args) => {
    let color = config.color;
    let footer = config.footer;
    con.query(`SELECT * FROM titanbot_cfg`, (err, rows) => {
        if (err) throw err;
        const notifyrole = rows[3].value;

        msg.member.addRole(`${notifyrole}`); // 599646025757753344 599646025757753344
        const roleadded = new discord.RichEmbed()
            .setTitle('✅ You will now recieve notifications!')
            .setColor(color)
            .setFooter(footer);
        msg.channel.send(roleadded);
    });
}

module.exports.help = {
    name: "sub"
}