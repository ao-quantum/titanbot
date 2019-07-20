const discord = require('discord.js');
const request = require('request');
const mysql = require('mysql')
const config = require('../config/config.json');

const con = mysql.createConnection({
    host: "na-sql.pebblehost.com",
    database: "customer_77991",
    user: "customer_77991",
    password: "7987273d7e",
    charset: "utf8mb4_unicode_ci"
});

con.connect(err => {
    if (err) throw err;
})

module.exports.run = (Client, msg, args) => {
    let color = config.color;
    let footer = config.footer;
    const status = request(config.serverip, {
        json: true
    }, (err, res, body) => {
        if (err) {
            return console.log(err);
        }

        let statusIcon;
        let statusvalue;

        if (body.serverStatus === "online") {
            statusIcon = "✅";
            statusvalue = "Server is Online.";
        } else if (body.serverStatus === "offline") {
            statusIcon = "❌";
            statusvalue = "Server is Offline";
        };

        let sqlstatus;
        let sqlicon;
        if (con) {
            sqlicon = "✅";
            setStatus = "Online and functional"
        } else {
            sqlicon = "❌";
            setStatus = "Not connected and/or has problems";
        }

        const statusEmbed = new discord.RichEmbed()
            .addField(`${statusIcon}  -  Minecraft Server`, `${statusvalue} Ping: ${body.ping}ms`)
            .addField(`${config.botstatus}  -  Bot Status`, `The bot is ${config.botstatusonline}`)
            .addField(`${sqlicon}  -  MySQL Database`, `MySQL Database ${setStatus}`)
            .setColor(color)
            .setFooter(footer);

        msg.channel.send(statusEmbed);
    });
}

module.exports.help = {
    name: "status"
}