/***********************************************
*
*                 Titan Bot
*
*          Made by Quantonium#6562
*        © 2019 Aditya "Quantum" Das
*
************************************************/
const discord = require('discord.js')
const request = require('request')
const config = require('../config/config.json')

module.exports.run = (Client, msg, args) => {
    const color = config.color;
    const footer = config.footer;

    const messageArray = msg.content.split(" ")
    const top = messageArray[1]
    request('server_oitc_leaderboard_in_json', {
        json: true
    }, (err, _, body) => {
        if (err) {
            return console.log(err) && msg.channel.send(`An error occured retrieving the scoreboard :(`)
        };

        num = parseInt(top)

        if (num == Nan || num == undefined) {
            msg.channel.send("Enter a valid number");
            return;
        }

        if (num > 10) {
            msg.channel.send("We can't list more than 10 players")
            return;
        }

        const leaderboard = new discord.RichEmbed()
            .setTitle(`TitanForgedMC top ${num} players`)
            .setColor(color)
            .setFooter(footer);
        
        for (i = 0; i < num; ++i) {
            leaderboard.addField(`${body[0].name}`, `Wins: ${body[0].wins}. Loss: ${Math.floor((body[0].games) - (body[0].wins))}. Kills: ${body[0].kills}.`)
        }

        msg.channel.send(leaderboard);
    });
}

module.exports.help = {
    name: "leaderboard"
}
