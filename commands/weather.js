/***********************************************
*
*                 Titan Bot
*
*          Made by Quantonium#6562
*        © 2019 Aditya "Quantum" Das
*
************************************************/
const discord = require('discord.js');
const weatherjs = require('weather-js')
const config = require('../config/config.json');

module.exports.run = (Client, msg, args) => {
    const location = args.join(" ");
    weatherjs.find({search: location, degreeType: 'C'}, (err, result) => {
        if (err) {
            console.log(err)
            return msg.channel.send('❌ An error occured')
        };
        const embed = new discord.RichEmbed()
        .setAuthor(`Weather in ${result[0].location.name}`)
        .addField(`Current weather`, result[0].current.skytext, true)
        .addField(`Temperature`, result[0].current.temperature, true)
        .addField(`Feels like`, result[0].current.feelslike, true)
        .addField(`Wind speed`, result[0].current.windspeed, true)
        .addField(`Timezone`, `GMT${result[0].location.timezone}`, true)
        .setThumbnail(result[0].current.imageUrl)
        .setColor(config.color)
        .setFooter(config.footer);
        msg.channel.send(embed);
    })
}

module.exports.help = {
    name: "weather"
}
