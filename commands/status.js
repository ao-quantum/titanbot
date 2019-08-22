/***********************************************
*
*                 Titan Bot
*
*          Made by Quantonium#6562
*        © 2019 Aditya "Quantum" Das
*
************************************************/
const discord = require('discord.js');
const request = require('request');
const config = require('../config/config.json');

module.exports.run = (Client, msg, args, con) => {
    let color = config.color;
    let footer = config.footer;
    request(config.serverip, { json: true }, (err, res, body) => {
        if (err) {
            return console.log(err);
        }

        let statusIcon;
        let statusvalue;

        if (body.serverStatus === true) {
            statusIcon = "✅";
            statusvalue = "Server is Online.";
        } else {
            statusIcon = "❌";
            statusvalue = "Server is Offline";
        };

        let sqlstatus;
        let sqlicon;
        con.query(`SELECT * FROM titanbot_xp`, (rows) => {
            if (rows[0].xp) {
                sqlicon = "✅";
                sqlstatus = "Online and functional"
            } else {
                sqlicon = "❌";
                sqlstatus = "Not connected and/or has problems";
            }
        });

        const statusEmbed = new discord.RichEmbed()
            .addField(`${statusIcon}  -  Minecraft Server`, `${statusvalue} Ping: ${body.ping}ms`)
            .addField(`${config.botstatus}  -  Bot Status`, `The bot is ${config.botstatusonline}`)
            .addField(`${sqlicon}  -  MySQL Database`, `MySQL Database ${sqlstatus}`)
            .setColor(color)
            .setFooter(footer);

        msg.channel.send(statusEmbed);
    });
}

module.exports.help = {
    name: "status"
}