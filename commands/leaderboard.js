const discord = require('discord.js')
const request = require('request')
const config = require('../config/config.json')

module.exports.run = (Client, msg, args) => {
    const color = config.color;
    const footer = config.footer;

    const messageArray = msg.content.split(" ")
    const top = messageArray[1]
    request('http://144.217.139.188:8081/oitc/leaderboard', {
        json: true
    }, (err, res, body) => {
        if (err) {
            return console.log(err) && msg.channel.send(`An error occured retrieving the scoreboard :(`)
        };
        /*
        const leaderboard10 = new discord.RichEmbed()
        .addField(`${body[0].name}`, `Wins: ${body[0].wins}. Loss: ${Math.floor((body[0].games) - (body[0].wins))}. Kills: ${body[0].kills}.`)
        .addField(`${body[1].name}`, `Wins: ${body[1].wins}. Loss: ${Math.floor((body[1].games) - (body[1].wins))}. Kills: ${body[1].kills}.`)
        .addField(`${body[2].name}`, `Wins: ${body[1].wins}. Loss: ${Math.floor((body[2].games) - (body[2].wins))}. Kills: ${body[2].kills}.`)
        .addField(`${body[3].name}`, `Wins: ${body[3].wins}. Loss: ${Math.floor((body[3].games) - (body[3].wins))}. Kills: ${body[3].kills}.`)
        .addField(`${body[4].name}`, `Wins: ${body[4].wins}. Loss: ${Math.floor((body[4].games) - (body[4].wins))}. Kills: ${body[4].kills}.`)
        .addField(`${body[5].name}`, `Wins: ${body[5].wins}. Loss: ${Math.floor((body[5].games) - (body[5].wins))}. Kills: ${body[5].kills}.`)
        .addField(`${body[6].name}`, `Wins: ${body[6].wins}. Loss: ${Math.floor((body[6].games) - (body[6].wins))}. Kills: ${body[6].kills}.`)
        .addField(`${body[7].name}`, `Wins: ${body[7].wins}. Loss: ${Math.floor((body[7].games) - (body[7].wins))}. Kills: ${body[7].kills}.`)
        .addField(`${body[8].name}`, `Wins: ${body[8].wins}. Loss: ${Math.floor((body[8].games) - (body[8].wins))}. Kills: ${body[8].kills}.`)
        .addField(`${body[9].name}`, `Wins: ${body[9].wins}. Loss: ${Math.floor((body[9].games) - (body[9].wins))}. Kills: ${body[9].kills}.`)
        .addField(`${body[10].name}`, `Wins: ${body[10].wins}. Loss: ${Math.floor((body[10].games) - (body[10].wins))}. Kills: ${body[10].kills}.`)
        .setColor(color)
        .setFooter(footer);
        */
        switch (top) {
            case "1" || `top`:
                const leaderboardtop = new discord.RichEmbed()
                    .setTitle("TitanForgedMC Top Player")
                    .addField(`${body[0].name}`, `Wins: ${body[0].wins}. Loss: ${Math.floor((body[0].games) - (body[0].wins))}. Kills: ${body[0].kills}.`)
                    .setColor(color)
                    .setFooter(footer);
                msg.channel.send(leaderboardtop);
                break;
            case 'top':
                msg.channel.send(leaderboardtop);
                break;
            case "3":
                const leaderboardtop3 = new discord.RichEmbed()
                    .setTitle("TitanForgedMC Top 3 Players")
                    .addField(`${body[0].name}`, `Wins: ${body[0].wins}. Loss: ${Math.floor((body[0].games) - (body[0].wins))}. Kills: ${body[0].kills}.`)
                    .addField(`${body[1].name}`, `Wins: ${body[1].wins}. Loss: ${Math.floor((body[1].games) - (body[1].wins))}. Kills: ${body[1].kills}.`)
                    .addField(`${body[2].name}`, `Wins: ${body[2].wins}. Loss: ${Math.floor((body[2].games) - (body[2].wins))}. Kills: ${body[2].kills}.`)
                    .setColor(color)
                    .setFooter(footer);
                msg.channel.send(leaderboardtop3);
                break;
            case "5":
                const leaderboardtop5 = new discord.RichEmbed()
                    .setTitle("TitanForgedMC Top 5 Players")
                    .addField(`${body[0].name}`, `Wins: ${body[0].wins}. Loss: ${Math.floor((body[0].games) - (body[0].wins))}. Kills: ${body[0].kills}.`)
                    .addField(`${body[1].name}`, `Wins: ${body[1].wins}. Loss: ${Math.floor((body[1].games) - (body[1].wins))}. Kills: ${body[1].kills}.`)
                    .addField(`${body[2].name}`, `Wins: ${body[2].wins}. Loss: ${Math.floor((body[2].games) - (body[2].wins))}. Kills: ${body[2].kills}.`)
                    .addField(`${body[3].name}`, `Wins: ${body[3].wins}. Loss: ${Math.floor((body[3].games) - (body[3].wins))}. Kills: ${body[3].kills}.`)
                    .addField(`${body[4].name}`, `Wins: ${body[4].wins}. Loss: ${Math.floor((body[4].games) - (body[4].wins))}. Kills: ${body[4].kills}.`)
                    .setColor(color)
                    .setFooter(footer);
                msg.channel.send(leaderboardtop5);
                break;
            case "10":
                msg.channel.send("The top 10 currently does not work as there are not enough players to list")
                break;
            default:
                msg.channel.send("The top amount must be either 1, 3, 5 or 10.")
        };
    });
}

module.exports.help = {
    name: "leaderboard"
}
