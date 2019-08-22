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
    let color = config.color;
    let footer = config.footer;
    con.query(`SELECT * FROM titanbot_cfg`, (err, rows) => {
        if (err) throw err;
        const notifyrole = rows[3].value;

        msg.member.addRole(`${notifyrole}`);
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