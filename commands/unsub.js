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
    console.log("[STARTUP] Connected to MySql database");
});

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
